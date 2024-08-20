export class NotAnAddress extends Error {
	constructor(address: string) {
		super(`${address} is not a valid EVM address!`);
		this.name = 'Not an EVM address';
	}
}
