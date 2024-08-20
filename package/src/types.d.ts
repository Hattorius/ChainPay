import { CreateTransactionCryptoKeyPairInput } from './transacting/createTransactionCryptoKeyPair';
import { CreateTransactionEthersWalletInput } from './transacting/createTransactionEthersWallet';

export type TransactionType = {
	data: any;
	token: string;
	amount: bigint;
	recipient: string;
	signature: Buffer;
};

export type CreateTransactionInputType =
	| CreateTransactionEthersWalletInput
	| CreateTransactionCryptoKeyPairInput;
