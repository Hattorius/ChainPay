import getPublicClient from './getPublicClient';
import abi from './abi.json';

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

export default isPaid;
