import { Wallet } from 'ethers';
import { datafy } from '../data';
import { TransactionType } from '../types';

export type CreateTransactionEthersWalletInput = {
	recipient?: string;
	tokenToReceive: string;
	tokenToReceiveAmount: bigint;
	wallet: Wallet;
	data: any;
};

const createTransactionEthersWallet = async ({
	recipient,
	tokenToReceive,
	tokenToReceiveAmount,
	wallet,
	data
}: CreateTransactionEthersWalletInput) => {
	if (!recipient) {
		recipient = wallet.address;
	}

	const innerData = {
		recipient,
		tokenToReceive,
		tokenToReceiveAmount,
		data
	};
	const signature = await wallet.signMessage(datafy(innerData));

	return {
		data,
		token: tokenToReceive,
		amount: tokenToReceiveAmount,
		recipient,
		signature: Buffer.from(signature)
	} as TransactionType;
};

export default createTransactionEthersWallet;
