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
};

export type CreateTransactionInput = SignMessageEthersInput | SignMessageViemInput;
