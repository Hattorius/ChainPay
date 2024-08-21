const { ethers } = require('ethers');
const { createTransaction } = require('./../dist');

const signer = ethers.Wallet.createRandom();

(async () => {
	const res = await createTransaction({
		wallet: signer,
		recipient: signer.address,
		tokenToReceive: signer.address,
		tokenToReceiveAmount: 0,
		data: 'Hello, world!'
	});

	console.log(signer.address);
	console.log(res);
})();
