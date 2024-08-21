export class NotAnAddress extends Error {
	constructor(address: string) {
		super(`${address} is not a valid EVM address!`);
		this.name = 'Not an EVM address';
	}
}

export class NotHex extends Error {
	constructor(supposedHex: string) {
		super(`${supposedHex} is not valid hexadecimal!`);
		this.name = 'Not a hex string';
	}
}
