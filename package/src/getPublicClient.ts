import { createPublicClient, defineChain, http } from 'viem';

const bsc = defineChain({
	id: 56,
	name: 'BNB Smart Chain',
	nativeCurrency: {
		decimals: 18,
		name: 'BNB',
		symbol: 'BNB'
	},
	rpcUrls: {
		default: { http: ['https://rpc.ankr.com/bsc'] }
	},
	blockExplorers: {
		default: {
			name: 'BscScan',
			url: 'https://bscscan.com',
			apiUrl: 'https://api.bscscan.com/api'
		}
	},
	contracts: {
		multicall3: {
			address: '0xca11bde05977b3631167028862be2a173976ca11',
			blockCreated: 15921452
		}
	}
});

const opBNB = defineChain({
	id: 204,
	name: 'opBNB',
	nativeCurrency: {
		name: 'BNB',
		symbol: 'BNB',
		decimals: 18
	},
	rpcUrls: {
		default: { http: ['https://opbnb-mainnet-rpc.bnbchain.org'] }
	},
	blockExplorers: {
		default: {
			name: 'opbnbscan',
			url: 'https://mainnet.opbnbscan.com'
		}
	},
	contracts: {
		multicall3: {
			address: '0xcA11bde05977b3631167028862bE2a173976CA11',
			blockCreated: 512881
		}
	}
});

const getPublicClient = () => {
	return createPublicClient({
		chain: opBNB,
		transport: http()
	});
};

export default getPublicClient;
