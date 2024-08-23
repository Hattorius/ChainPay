import tokens from '$lib/data/tokens.json';
import pools from '$lib/data/pools.json';
import type { TokenType } from '../../app';

const get = (address: string) => tokens.filter((t) => t.id === address)[0] as TokenType;
const getAll = () => tokens as TokenType[];
const getPools = (address: string) =>
	pools
		.filter((p) => p.token0 === address || p.token1 === address)
		.map((p) => ({
			token0: get(p.token0) as TokenType,
			token1: get(p.token1) as TokenType,
			id: p.id,
			feeTier: p.feeTier
		}));
const getPaired = (address: string) =>
	Array.from(
		new Set(
			pools
				.filter((p) => p.token0 === address || p.token1 === address)
				.flatMap((p) => [p.token0, p.token1])
				.filter((p) => p !== address)
		)
	).map((addr) => get(addr));

export default {
	get,
	getAll,
	getPools,
	getPaired
};
