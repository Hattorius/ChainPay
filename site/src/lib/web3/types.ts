import type { Chain } from 'viem/chains';

/**
 * Add here your chain id as hex, be sure to add your chain in the chainsMetadata object too
 */
export enum Chains {
	ETH = '0x1',
	BSC = '0x38'
}

export type ChainsMetadata = Record<Chains, Chain>;
