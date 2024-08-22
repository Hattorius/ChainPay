import { CreateTransactionInput, TransactionType } from './types';
import { isEthersInput, signMessageEthers } from './signing/signMessageEthers';
import { isViemInput, signMessageViem } from './signing/signMessageViem';

const createTransaction = async (input: CreateTransactionInput) => {
	let data, signature, recipient;

	if (isEthersInput(input)) {
		({ data, signature, recipient } = await signMessageEthers(input));
	} else if (isViemInput(input)) {
		({ data, signature, recipient } = await signMessageViem(input));
	}

	if (!data || !signature || !recipient) return undefined;

	return {
		data: data,
		token: input.token,
		amount: input.amount,
		recipient,
		signature: signature
	} as TransactionType;
};

export default createTransaction;
