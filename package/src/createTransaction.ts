import { Wallet } from 'ethers';
import { datafy } from './data';
import { TransactionType } from './types';
import signMessage from './signing/signMessage';

const createTransaction = async ({
	wallet,
	recipient,
	tokenToReceive,
	tokenToReceiveAmount,
	data
}: {
	wallet: Wallet;
	recipient?: string;
	tokenToReceive: string;
	tokenToReceiveAmount: number | bigint;
	data: any;
}) => {
	if (!recipient) {
		recipient = wallet.address;
	}

	const signing = await signMessage(
		wallet,
		recipient,
		tokenToReceive,
		tokenToReceiveAmount,
		datafy(data)
	);

	return {
		data: signing.data,
		token: tokenToReceive,
		amount: tokenToReceiveAmount,
		recipient,
		signature: signing.signature
	} as TransactionType;
};

export default createTransaction;
