// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

type TokenType = {
	decimals: string;
	id: string;
	name: string;
	symbol: string;
};

export { TokenType };
