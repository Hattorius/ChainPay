import { getBytes, Wallet } from 'ethers';
import { SignResultType } from '../types';
import utils from '../utils';

export interface SignMessageEthersInput {
	signer: Wallet;
	recipient?: string;
	token: string;
	amount: number | bigint;
	data_string: string;
	type: 'ethers';
}

export const isEthersInput = (obj: any): obj is SignMessageEthersInput =>
	obj && obj.type == 'ethers';

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

	const { data, messageHash } = utils.dataToHash(recipient, token, amount, data_string);
	const signature = await signer.signMessage(getBytes(messageHash));

	return {
		data: `0x${data}`,
		signature,
		recipient
	} as SignResultType;
};

export default signMessageEthers;
