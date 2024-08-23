import {
	formatEther,
	formatUnits,
	parseEther,
	parseUnits,
	solidityPackedKeccak256,
	toUtf8Bytes
} from 'ethers';
import safeBase64 from './safeBase64';
import { TransactionType } from './types';
import { NotEncodedTransaction } from './errors';
import pools from './pools.json';
import getPublicClient from './getPublicClient';
import abi from './abi.json';

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

const dataToHash = (
	recipient: string,
	token: string,
	amount: number | bigint,
	data_string: string
) => {
	const data = Array.from(toUtf8Bytes(data_string), (byte) =>
		byte.toString(16).padStart(2, '0')
	).join('');

	const messageHash = solidityPackedKeccak256(
		['address', 'address', 'uint256', 'bytes'],
		[recipient, token, amount, toUtf8Bytes(data_string)]
	);

	return {
		data,
		messageHash
	};
};

// for now just fully hardcoded stuff
const findPool = (
	token0: string,
	token1: string
):
	| undefined
	| {
			id: string;
			feeTier: number;
	  } =>
	pools
		.filter(
			(pool) =>
				(pool.token0 === token0 && pool.token1 === token1) ||
				(pool.token0 === token1 && pool.token1 === token0)
		)
		.map((pool) => ({
			id: pool.id,
			feeTier: parseInt(pool.feeTier)
		}))[0];

const isPaid = async (chianpayContract: `0x${string}`, signature: string) => {
	const publicClient = getPublicClient();
	const result = await publicClient.readContract({
		address: chianpayContract,
		abi,
		functionName: 'isPaid',
		args: [signature]
	});

	return result;
};

export default {
	formatUnits,
	formatEther,
	parseUnits,
	parseEther,
	decodeTransaction,
	dataToHash,
	findPool,
	isPaid
};
