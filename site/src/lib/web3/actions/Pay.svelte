<script lang="ts">
	import { onMount } from 'svelte';
	import { publicClient, walletAccount, walletClient } from '$lib/web3/store';
	import chainpay, { type PaymentData, type TransactionType } from 'chainpay';
	import { defineChain } from 'viem/utils';
	import extractError from '$lib/scripts/extractError';

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
	let error: string | null = null;

	const pay = async () => {
		error = null;

		if (r && $walletClient) {
			loading = true;

			if (r.approve && !approved) {
				const approveResult = await $publicClient
					.simulateContract({
						address: r.approve.token,
						abi: chainpay.erc20Abi,
						functionName: 'approve',
						account: $walletAccount,
						args: [r.chainpayContract, r.approve.amount],
						chain: bsc
					})
					.catch((e) => {
						error = extractError(`${e}`);
						throw e;
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

			const payResult = await $publicClient
				.simulateContract({
					address: r.chainpayContract,
					abi: r.abi,
					functionName: r.functionName,
					account: $walletAccount,
					args: r.args,
					value: r.value as any, // wtf why does it only allow "undefined" type
					chain: bsc
				})
				.catch((e) => {
					error = extractError(`${e}`);
					throw e;
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

	const onPay = () => {
		try {
			pay();
		} finally {
			let loading = false;
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

<button class="secondary" on:click={onPay}>
	{#if loading}
		Waiting for transaction
	{:else if paid}
		Paid
	{:else if !approved && token.toLowerCase() !== chainpay.constants.WRAPPED_BNB.toLowerCase()}
		Approve {symbol}
	{:else}
		<slot />
	{/if}
</button>

{#if error !== null}
	<p>
		{error}
	</p>
{/if}

<style>
	p {
		margin-top: 10px;
	}
</style>
