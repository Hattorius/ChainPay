<script lang="ts">
	import TokenPicker from '$lib/TokenPicker.svelte';
	import { formatUnits } from 'viem';
	import type { TransactionType } from 'chainpay';
	import chainpay from 'chainpay';
	import type { TokenType } from '../../app';
	import getToken from '$lib/getToken';
	import tokens from '$lib/tokens';
	import Wallet from '$lib/Wallet.svelte';
	import ConnectButton from '$lib/CreatePaymentRequest/ConnectButton.svelte';
	import ChangeNetworkButton from '$lib/CreatePaymentRequest/ChangeNetworkButton.svelte';
	import Pay from './Pay.svelte';
	import { onMount } from 'svelte';
	import { publicClient } from '$lib/stores/auth/store';
	import getPrice from '$lib/getPrice';

	const CHAINPAY_CONTRACT = '0x0C5BE6D232e89723F6aFd50707a6610b8e41b167';

	export let transaction: TransactionType;

	let payingTokenPrice = 0;
	let receivingTokenPrice = 0;
	let toSend: TokenType | null = null;
	let isDifferent = false;
	let paymentDue: bigint | undefined;
	let paid = false;

	$: paymentAmount = paymentDue ? paymentDue : BigInt(0);
	$: buttonText =
		toSend !== null
			? !isDifferent
				? `Pay ${
						parseInt(
							(
								parseFloat(
									formatUnits(
										BigInt(transaction.amount),
										parseInt(getToken.byAddress(transaction.token).decimals)
									)
								) * 10000000
							).toString()
						) / 10000000
				  }
			${getToken.byAddress(transaction.token).symbol}`
				: paymentDue
				? `Pay max ${
						parseInt(
							(
								parseFloat(
									formatUnits(paymentDue, parseInt(getToken.byAddress(toSend.id).decimals))
								) * 10000000
							).toString()
						) / 10000000
				  }
			${getToken.byAddress(toSend.id).symbol}`
				: 'Wait1'
			: 'Wait2';

	$: {
		paymentDue = undefined;
		if (toSend !== null && isDifferent && payingTokenPrice !== 0 && receivingTokenPrice !== 0) {
			const transactionAmountInUSD =
				(Number(transaction.amount) /
					Math.pow(10, parseInt(getToken.byAddress(transaction.token).decimals))) *
				receivingTokenPrice;

			const toSendAmount =
				(transactionAmountInUSD / payingTokenPrice) * Math.pow(10, parseInt(toSend.decimals));

			paymentDue = BigInt(Math.round(toSendAmount * 1.05)); // Add 5% just to make sure (this is called slippage I guess?!)
		}
	}

	const onTokenPick = (e: CustomEvent<TokenType>) => {
		toSend = e.detail;

		if (toSend.id !== transaction.token) {
			if (isDifferent) {
				if (receivingTokenPrice === 0) {
					(async () => {
						receivingTokenPrice = (await getPrice(transaction.token)) ?? 0;
					})();
				}
				(async () => {
					payingTokenPrice = (await getPrice(toSend.id)) ?? 0;
				})();
			}
		} else {
			isDifferent = false;
		}
	};

	onMount(() => {
		(async () => {
			const result = await $publicClient.readContract({
				address: CHAINPAY_CONTRACT,
				abi: chainpay.abi,
				functionName: 'isPaid',
				args: [transaction.signature]
			});

			paid = result as boolean;
		})();
	});
</script>

{#if paid}
	<div class="text-base">
		<p>This has already been paid</p>
	</div>
{:else}
	<div class="text-base">
		<p>Pick a token to pay with</p>
		<TokenPicker
			tokens={[tokens.get(transaction.token), ...tokens.getPaired(transaction.token)]}
			on:change={onTokenPick}
		/>

		{#if toSend === null}
			<button class="border mt-6 w-full h-10 hover:bg-gray-900 transition">
				Please select a token
			</button>
		{:else}
			<Wallet>
				<ConnectButton slot="NotConnected" />
				<ChangeNetworkButton slot="WrongNetwork" />
				{#if (isDifferent && paymentDue) || !isDifferent}
					<Pay
						{transaction}
						{CHAINPAY_CONTRACT}
						token={toSend.id}
						amount={paymentAmount}
						symbol={toSend.symbol}
					>
						{buttonText}
					</Pay>
				{/if}
			</Wallet>
		{/if}
	</div>
{/if}
