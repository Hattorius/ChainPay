// this DOES NOT work
// this DOES NOT work
// this DOES NOT work
// this DOES NOT work
// this DOES NOT work
// this DOES NOT work
// this DOES NOT work

import type { PaymentData } from '../types';
import abi from '../abi.json';
import { erc20Abi } from 'viem';
import getPublicClient from '../getPublicClient';

export interface PayViemInput {
	wallet: any; // ugly, I know
	paymentData: PaymentData<typeof abi>;
}

const payViem = async ({ wallet, paymentData }: PayViemInput) => {
	if (!wallet.account) return;
	const publicClient = getPublicClient();

	if (paymentData.approve) {
		const approveResult = await publicClient.simulateContract({
			address: paymentData.approve.token,
			abi: erc20Abi,
			functionName: 'approve',
			account: wallet.account,
			args: [paymentData.chainpayContract, paymentData.approve.amount]
		});
		await wallet.writeContract(approveResult.request);
	}

	const payResult = await publicClient.simulateContract({
		address: paymentData.chainpayContract,
		abi: paymentData.abi,
		functionName: paymentData.functionName,
		account: wallet.account,
		args: paymentData.args,
		value: paymentData.value
	});
	await wallet.writeContract(payResult.request);
};

export default payViem;
