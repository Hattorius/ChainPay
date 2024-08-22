const { swapAmount } = require('./../dist').default;

(async () => {
	const response = await swapAmount({
		payingToken: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
		receivingToken: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
		receivingAmount: BigInt(50000000000000)
	});

	console.log(response);
})();
