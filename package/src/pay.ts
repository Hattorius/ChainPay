import { WalletClient } from 'viem';
import findPool from './findPool';
import { PaymentData, TransactionType } from './types';
import utils from './utils';
import abi from './abi.json';
import payViem from './paying/payViem';

export type PayInput =
	| {
			transaction: string | TransactionType;
			token: `0x${string}`; // token user wants to pay with
			amount: bigint; // amount user wants to pay with
			chainpayContract: `0x${string}`;
			type: 'diy';
	  }
	| {
			transaction: string | TransactionType;
			token: `0x${string}`; // token user wants to pay with
			amount: bigint; // amount user wants to pay with
			chainpayContract: `0x${string}`;
			type: 'viem';
			wallet: WalletClient;
	  };

const WRAPPED_BNB = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c';

const pay = async (input: PayInput) => {
	let { transaction, token, amount, chainpayContract } = input;
	if (typeof transaction === 'string') {
		transaction = utils.decodeTransaction(transaction);
	}

	let data: {
		value?: bigint;
		args: any;
		approve?: {
			token: string;
			amount: bigint;
		};
	};

	if (transaction.token === WRAPPED_BNB && token === WRAPPED_BNB) {
		// invoice in BNB, pays in BNB
		// pay(address recipient, bytes memory signature, bytes memory data) payable
		data = {
			value: BigInt(transaction.amount),
			args: [transaction.recipient, transaction.signature, transaction.data]
		};
	} else if (transaction.token === token) {
		// invoice in token, pays in same token
		//  pay(address recipient, address token, uint256 amount, bytes memory signature, bytes memory data)
		data = {
			args: [
				transaction.recipient,
				transaction.token,
				BigInt(transaction.amount),
				transaction.signature,
				transaction.data
			],
			approve: {
				token: transaction.token,
				amount: BigInt(transaction.amount)
			}
		};
	} else if (transaction.token !== WRAPPED_BNB && token === WRAPPED_BNB) {
		// invoice in token, pays in BNB
		// pay(address recipient, address token, uint256 amount, uint24 fee, bytes memory signature, bytes memory data) payable
		const pool = findPool(transaction.token, WRAPPED_BNB);
		if (!pool) {
			return undefined; // give up
		}

		data = {
			value: amount,
			args: [
				transaction.recipient,
				transaction.token,
				BigInt(transaction.amount),
				pool.feeTier,
				transaction.signature,
				transaction.data
			]
		};
	} else {
		// invoice in token or BNB, pays in other token
		// pay(address recipient, address expectedToken, uint256 expectedTokenAmount, address payingToken, uint256 payingTokenAmount, uint24 fee, bytes memory signature, bytes memory data)
		const pool = findPool(transaction.token, token);
		if (!pool) {
			return undefined; // also give up
		}

		data = {
			args: [
				transaction.recipient,
				transaction.token,
				BigInt(transaction.amount),
				token,
				amount,
				pool.feeTier,
				transaction.signature,
				transaction.data
			],
			approve: {
				token: token,
				amount: amount
			}
		};
	}

	const paymentData = {
		...data,
		chainpayContract,
		abi,
		functionName: 'pay'
	} as PaymentData<typeof abi>;

	if (input.type === 'diy') {
		return paymentData;
	} else if (input.type === 'viem') {
		return await payViem({
			wallet: input.wallet,
			paymentData
		});
	}
};
