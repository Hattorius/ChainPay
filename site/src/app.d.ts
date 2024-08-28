// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import * as THREE from 'three';

declare global {
	namespace App {
		interface Platform {
			env: Env;
			cf: CfProperties;
			ctx: ExecutionContext;
		}
	}

	interface Window {
		three: typeof THREE;
	}
}

type TokenType = {
	decimals: string;
	id: string;
	name: string;
	symbol: string;
};

export { TokenType };
