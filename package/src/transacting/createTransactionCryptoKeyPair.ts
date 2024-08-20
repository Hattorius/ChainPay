import { isAddress } from 'ethers';
import { NotAnAddress } from '../errors';
import signDataWithDerivedKey from '../signing/signData';
import { TransactionType } from '../types';
import generateKeyPair from '../signing/generateKeyPair';

export type CreateTransactionCryptoKeyPairInput = {
	recipient: string;
	tokenToReceive: string;
	tokenToReceiveAmount: bigint;
	data: any;
	key?: CryptoKeyPair;
};

const createTransactionCryptoKeyPair = async ({
	recipient,
	tokenToReceive,
	tokenToReceiveAmount,
	data,
	key
}: CreateTransactionCryptoKeyPairInput) => {
	if (!isAddress(recipient)) {
		throw new NotAnAddress(recipient);
	}
	if (!isAddress(tokenToReceive)) {
		throw new NotAnAddress(tokenToReceive);
	}

	if (!key) {
		key = await generateKeyPair();
	}

	const innerData = {
		recipient,
		tokenToReceive,
		tokenToReceiveAmount,
		data
	};
	const signature = await signDataWithDerivedKey(key.privateKey, innerData);

	return {
		data,
		token: tokenToReceive,
		amount: tokenToReceiveAmount,
		recipient,
		signature: Buffer.from(signature)
	} as TransactionType;
};

export default createTransactionCryptoKeyPair;
