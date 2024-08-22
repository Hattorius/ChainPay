import { formatEther, formatUnits, parseEther, parseUnits } from 'ethers';
import safeBase64 from './safeBase64';
import { TransactionType } from './types';

const decodeTransaction = (input: string) => {
	input = safeBase64.decode(input);

	const recipient = input.substring(0, 42);
	const token = input.substring(42, 84);
	const signature = input.substring(84, 216);

	let remainder = input.substring(216);
	let dataIndex = remainder.indexOf('0x');
	const amount = Number(remainder.substring(0, dataIndex));
	const data = remainder.substring(dataIndex);

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
