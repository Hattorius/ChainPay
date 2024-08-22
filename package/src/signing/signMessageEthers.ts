import { getBytes, Wallet } from 'ethers';
import dataToHash from '../dataToHash';
import { CreateTransactionInput, SignResultType } from '../types';

export interface SignMessageEthersInput {
	signer: Wallet;
	recipient?: string;
	token: string;
	amount: number | bigint;
	data_string: string;
}

export const isEthersInput = (obj: any): obj is SignMessageEthersInput =>
	obj && typeof obj.signer !== 'undefined';

export const signMessageEthers = async ({
	signer,
	recipient,
	token,
	amount,
	data_string
}: SignMessageEthersInput) => {
	if (!recipient) {
		recipient = signer.address;
	}

	const { data, messageHash } = dataToHash(recipient, token, amount, data_string);
	const signature = await signer.signMessage(getBytes(messageHash));

	return {
		data: `0x${data}`,
		signature,
		recipient
	} as SignResultType;
};

export default signMessageEthers;
