import { getContract, WalletClient } from 'viem';
import { TransactionType } from '../types';
import utils from '../utils';
import abi from '../abi.json';
import { erc20Abi } from 'viem';
import getPublicClient from '../getPublicClient';

export interface PayViemInput {
	transaction: string | TransactionType;
	token: `0x${string}`; // token user wants to pay with
	amount: bigint; // amount user wants to pay with
	wallet: WalletClient;
    chainpayAddress: `0x${string}`;
}

const payViem = async ({ transaction, token, amount, wallet, chainpayAddress }: PayViemInput) => {
    if (!wallet.account) return;

	if (typeof transaction === 'string') {
		transaction = utils.decodeTransaction(transaction);
	}

    const publicClient = getPublicClient();

    const contract = getContract({
        address: chainpayAddress,
        abi,
        client: {
            wallet
        }
    });

    const approveResult = await publicClient.simulateContract({
        address: token,
        abi: erc20Abi,
        functionName: 'approve',
        account: wallet.account,
        args: [
            chainpayAddress,
            amount
        ]
    });
    await wallet.writeContract(approveResult.request);
};

export default payViem;
