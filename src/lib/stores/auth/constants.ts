import { bsc, mainnet } from 'viem/chains';
import type { ChainsMetadata } from './types';
import { Chains } from './types';

/**
 *
 */
export const chainsMetadata: ChainsMetadata = {
	[Chains.ETH]: mainnet,
	[Chains.BNB]: bsc
};
