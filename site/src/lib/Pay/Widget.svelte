<script lang="ts">
	import TokenPicker from '$lib/TokenPicker.svelte';
	import { formatUnits } from 'viem';
	import type { TransactionType } from 'chainpay';
	import type { TokenType } from '../../app';
	import getPrice from '$lib/getPrice';
	import getToken from '$lib/getToken';

	export let transaction: TransactionType;
	let payingTokenPrice = 0;
	let receivingTokenPrice = 0;

	let toSend: TokenType | null = null;
	let isDifferent = false;
	let paymentDue: bigint | undefined;

	$: {
		paymentDue = undefined;
		if (toSend !== null && isDifferent && payingTokenPrice !== 0 && receivingTokenPrice !== 0) {
			// if tokens are different and prices have been found
			const transactionAmountInUSD =
				(Number(transaction.amount) /
					Math.pow(10, parseInt(getToken.byAddress(transaction.token).decimals))) *
				receivingTokenPrice;

			const toSendAmount =
				(transactionAmountInUSD / payingTokenPrice) * Math.pow(10, parseInt(toSend.decimals));

			paymentDue = BigInt(Math.round(toSendAmount * 1.05)); // Add 5% just to make sure
		}
	}

	const onTokenPick = (e: CustomEvent<TokenType>) => {
		toSend = e.detail;

		if (toSend.id !== transaction.token) {
			isDifferent = true;

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

	const onClick = () => {
		if (toSend !== null) {
			// TODO: payment logic
		}
	};
</script>

<div class="text-base">
	<p>Pick a token to pay with</p>
	<TokenPicker on:change={onTokenPick} />

	<button class="border mt-6 w-full h-10 hover:bg-gray-900 transition" on:click={onClick}>
		{#if toSend === null}
			Please pick a token
		{:else if !isDifferent}
			Pay max {parseInt(
				(
					parseFloat(
						formatUnits(
							BigInt(transaction.amount),
							parseInt(getToken.byAddress(transaction.token).decimals)
						)
					) * 10000000
				).toString()
			) / 10000000}
			{getToken.byAddress(transaction.token).symbol}
		{:else if paymentDue}
			Pay max {parseInt(
				(
					parseFloat(formatUnits(paymentDue, parseInt(getToken.byAddress(toSend.id).decimals))) *
					10000000
				).toString()
			) / 10000000}
			{getToken.byAddress(toSend.id).symbol}
		{:else}
			Wait
		{/if}
	</button>
</div>
