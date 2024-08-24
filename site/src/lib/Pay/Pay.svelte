<script lang="ts">
	import { onMount } from 'svelte';
	import { publicClient, walletAccount, walletClient } from '$lib/stores/auth/store';
	import chainpay, { type PaymentData, type TransactionType } from 'chainpay';
	import { defineChain } from 'viem/utils';

	const bsc = defineChain({
		id: 56,
		name: 'BNB Smart Chain',
		nativeCurrency: {
			decimals: 18,
			name: 'BNB',
			symbol: 'BNB'
		},
		rpcUrls: {
			default: { http: ['https://rpc.ankr.com/bsc'] },
			public: { http: ['https://rpc.ankr.com/bsc'] }
		},
		blockExplorers: {
			default: {
				name: 'BscScan',
				url: 'https://bscscan.com'
			}
		},
		contracts: {
			multicall3: {
				address: '0xca11bde05977b3631167028862be2a173976ca11',
				blockCreated: 15921452
			}
		},
		network: 'bsc'
	});

	export let transaction: TransactionType;
	export let token: string;
	export let amount: bigint;
	export let CHAINPAY_CONTRACT: `0x${string}`;
	export let symbol: string;

	let approved = false;
	let loading = false;
	let paid = false;
	let r: undefined | PaymentData<typeof chainpay.abi>;

	const onPay = async () => {
		if (r && $walletClient) {
			loading = true;

			if (r.approve && !approved) {
				const approveResult = await $publicClient.simulateContract({
					address: r.approve.token,
					abi: chainpay.erc20Abi,
					functionName: 'approve',
					account: $walletAccount,
					args: [r.chainpayContract, r.approve.amount],
					chain: bsc
				});
				try {
					const hash = await $walletClient.writeContract(approveResult.request);
					await $publicClient.waitForTransactionReceipt({
						hash
					});
				} catch {
					loading = false;
					return;
				}

				loading = false;
				approved = true;
				return;
			}

			const payResult = await $publicClient.simulateContract({
				address: r.chainpayContract,
				abi: r.abi,
				functionName: r.functionName,
				account: $walletAccount,
				args: r.args,
				value: r.value as any, // wtf why does it only allow "undefined" type
				chain: bsc
			});
			try {
				const hash = await $walletClient.writeContract(payResult.request);
				await $publicClient.waitForTransactionReceipt({
					hash
				});
			} catch {
				loading = false;
				return;
			}

			loading = false;
			paid = true;

			if (window.parent) {
				window.parent.postMessage(
					{
						...transaction
					},
					'*'
				);
			}
		}
	};

	onMount(() => {
		(async () => {
			const paymentDetails = await chainpay.pay({
				transaction,
				token: token as `0x${string}`,
				amount,
				feeTier: 500,
				chainpayContract: CHAINPAY_CONTRACT,
				type: 'raw'
			});

			if (paymentDetails) {
				r = paymentDetails;
			}
		})();
	});
</script>

<button class="border mt-6 w-full h-10 hover:bg-gray-900 transition" on:click={onPay}>
	{#if loading}
		Waiting for transaction
	{:else if paid}
		Paid
	{:else if !approved && token !== chainpay.constants.WRAPPED_BNB}
		Approve {symbol}
	{:else}
		<slot />
	{/if}
</button>
