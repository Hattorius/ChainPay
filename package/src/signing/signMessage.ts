import { getBytes, solidityPackedKeccak256, toUtf8Bytes, Wallet } from 'ethers';

export const signMessage = async (
	signer: Wallet,
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

	const signature = await signer.signMessage(getBytes(messageHash));

	return {
		data: `0x${data}`,
		signature
	};
};

export default signMessage;
