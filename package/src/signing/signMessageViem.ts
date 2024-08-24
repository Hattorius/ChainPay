import { SignableMessage, SignMessageReturnType } from 'viem';
import { getBytes } from 'ethers';
import { SignResultType } from '../types';
import createTransactionRaw from '../createTransactionRaw';

export interface SignMessageViemInput {
	walletClient: {
		signMessage: (args: {
			message: SignableMessage;
			account: `0x${string}`;
		}) => Promise<SignMessageReturnType>;
	};
	account: `0x${string}`;
	recipient?: string;
	token: string;
	amount: number | bigint;
	data_string?: string;
	data_raw?: Uint8Array | string;
	type: 'viem';
}

export const isViemInput = (obj: any): obj is SignMessageViemInput => obj && obj.type === 'viem';

export const signMessageViem = async ({
	walletClient,
	account,
	recipient,
	token,
	amount,
	data_string,
	data_raw
}: SignMessageViemInput) => {
	if (!recipient) {
		recipient = account;
	}

	const { data, messageHash } = createTransactionRaw({
		recipient,
		token,
		amount,
		data_string,
		data_raw
	});
	const signature = await walletClient.signMessage({
		message: {
			raw: getBytes(messageHash)
		},
		account
	});

	return {
		data: `0x${data}`,
		signature,
		recipient
	} as SignResultType;
};
