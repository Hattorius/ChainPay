import { getBytes, Wallet } from 'ethers';
import { SignResultType } from '../types';
import createTransactionRaw from '../createTransactionRaw';

export interface SignMessageEthersInput {
	signer: Wallet;
	recipient?: string;
	token: string;
	amount: number | bigint;
	data_string?: string;
	data_raw?: Uint8Array | string;
	type: 'ethers';
}

export const isEthersInput = (obj: any): obj is SignMessageEthersInput =>
	obj && obj.type == 'ethers';

export const signMessageEthers = async ({
	signer,
	recipient,
	token,
	amount,
	data_string,
	data_raw
}: SignMessageEthersInput) => {
	if (!recipient) {
		recipient = signer.address;
	}

	const { data, messageHash } = createTransactionRaw({
		recipient,
		token,
		amount,
		data_string,
		data_raw
	});
	const signature = await signer.signMessage(getBytes(messageHash));

	return {
		data: `0x${data}`,
		signature,
		recipient
	} as SignResultType;
};

export default signMessageEthers;
