import { formatEther, formatUnits, parseEther, parseUnits } from 'ethers';
import safeBase64 from './safeBase64';
import { TransactionType } from './types';
import { NotEncodedTransaction } from './errors';

const decodeTransaction = (input: string) => {
	const throwError = () => {
		throw new NotEncodedTransaction(input);
	};

	input = safeBase64.decode(input);
	if (input.length < 219) throwError();

	const recipient = input.substring(0, 42);
	const token = input.substring(42, 84);
	const signature = input.substring(84, 216);

	let remainder = input.substring(216);
	let dataIndex = remainder.indexOf('0x');
	if (dataIndex === -1) throwError();

	const amount = BigInt(remainder.substring(0, dataIndex));
	const data = remainder.substring(dataIndex);

	if (
		!recipient.startsWith('0x') ||
		!token.startsWith('0x') ||
		!signature.startsWith('0x') ||
		signature.length !== 132 ||
		!data.startsWith('0x')
	)
		throwError();

	return {
		data,
		token,
		amount,
		recipient,
		signature,
		encoded: input
	} as TransactionType;
};

export default {
	formatUnits,
	formatEther,
	parseUnits,
	parseEther,
	decodeTransaction
};
