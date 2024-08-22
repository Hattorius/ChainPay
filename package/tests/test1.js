const { ethers } = require('ethers');
const { createTransaction } = require('./../dist');
const { default: signMessageEthers } = require('../dist/signing/signMessageEthers');

const signer = ethers.Wallet.createRandom();

(async () => {
	const res = await signMessageEthers({
		signer: signer,
		recipient: signer.address,
		token: signer.address,
		amount: 0,
		data_string: ''
	});

	console.log(signer.address);
	console.log(res);
})();
