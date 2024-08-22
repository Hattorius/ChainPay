import { Account, SignMessageParameters, SignMessageReturnType } from 'viem';
import dataToHash from '../dataToHash';
import { getBytes } from 'ethers';
import { SignResultType } from '../types';

export interface SignMessageViemInput {
	walletClient: {
		signMessage: (
			args: SignMessageParameters<Account | undefined>
		) => Promise<SignMessageReturnType>;
	};
	account: `0x${string}`;
	recipient?: string;
	token: string;
	amount: number | bigint;
	data_string: string;
}

export const isViemInput = (obj: any): obj is SignMessageViemInput =>
	obj && typeof obj.walletClient !== 'undefined';

export const signMessageViem = async ({
	walletClient,
	account,
	recipient,
	token,
	amount,
	data_string
}: SignMessageViemInput) => {
	if (!recipient) {
		recipient = account;
	}

	const { data, messageHash } = dataToHash(recipient, token, amount, data_string);
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
