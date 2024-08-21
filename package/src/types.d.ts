import { CreateTransactionCryptoKeyPairInput } from './transacting/createTransactionCryptoKeyPair';

export type TransactionType = {
	data: string;
	token: string;
	amount: bigint;
	recipient: string;
	signature: string;
};
