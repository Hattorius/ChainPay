import { SignMessageEthersInput } from './signing/signMessageEthers';
import { SignMessageViemInput } from './signing/signMessageViem';
import { CreateTransactionCryptoKeyPairInput } from './transacting/createTransactionCryptoKeyPair';

export type SignResultType = {
	data: `0x${string}`;
	signature: `0x${string}`;
	recipient: string;
};

export type TransactionType = {
	data: string;
	token: string;
	amount: number | bigint;
	recipient: string;
	signature: string;
	encoded: string;
};

export type PaymentData<T> = {
	value?: bigint;
	args:
		| [string, string, string]
		| [string, string, bigint, string, string]
		| [string, string, bigint, number, string, string]
		| [string, string, bigint, string, bigint, number, string, string];
	chainpayContract: `0x${string}`;
	abi: T;
	functionName: string;
	approve?: {
		token: `0x${string}`;
		amount: bigint;
	};
};

export type CreateTransactionInput = SignMessageEthersInput | SignMessageViemInput;
