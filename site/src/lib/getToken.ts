import tokens from '$lib/tokens.json';

const byAddress = (address: string) => tokens.filter((token) => token.id === address)[0];

export default {
	byAddress
};
