import { bsc } from 'viem/chains';
import { createPublicClient, http } from "viem";

const getPublicClient = () => {
    return createPublicClient({
		chain: bsc,
		transport: http()
	});
}

export default getPublicClient;