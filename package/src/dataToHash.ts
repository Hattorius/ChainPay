import { solidityPackedKeccak256, toUtf8Bytes } from 'ethers';

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

export default dataToHash;
