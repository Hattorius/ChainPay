import pools from './pools.json';

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

export default findPool;
