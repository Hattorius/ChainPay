import { CreateTransactionInput, TransactionType } from './types';
import { isEthersInput, signMessageEthers } from './signing/signMessageEthers';
import { isViemInput, signMessageViem } from './signing/signMessageViem';
import safeBase64 from './safeBase64';
import createWidget from './createWidget';

const createTransaction = async (input: CreateTransactionInput) => {
	let data, signature, recipient;

	if (isEthersInput(input)) {
		({ data, signature, recipient } = await signMessageEthers(input));
	} else if (isViemInput(input)) {
		({ data, signature, recipient } = await signMessageViem(input));
	}

	if (!data || !signature || !recipient) return undefined;
	const encoded = safeBase64.encode(`${recipient}${input.token}${signature}${input.amount}${data}`);

	return {
		data: data,
		token: input.token,
		amount: input.amount,
		recipient,
		signature: signature,
		encoded,
		pay: `https://chainpay.dev/pay/${encoded}`,
		widgetUrl: `https://chainpay.dev/pay/${encoded}?embed`,
		widget: (el: string | HTMLIFrameElement) =>
			createWidget(`https://chainpay.dev/pay/${encoded}?embed`, el)
	} as TransactionType;
};

export default createTransaction;
