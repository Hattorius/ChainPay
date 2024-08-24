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

export class NotEncodedTransaction extends Error {
	constructor(supposedEncodedTransaction: string) {
		super(`Invalid encoded transaction!`);
		this.name = `Invalid encoded transaction: ${supposedEncodedTransaction}`;
	}
}

export class NoDataGiven extends Error {
	constructor() {
		super('No data given!');
		this.name =
			"When creating a transaction you'll at least have to pass some data. Either `data_string` or `data_raw` has to be set";
	}
}
