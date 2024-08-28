<script lang="ts">
	import chainpay from 'chainpay';
	import { walletAccount, walletClient } from '$lib/web3/store';
	import type { TokenType } from '../../../app';
	import { parseUnits } from 'viem';

	export let token: TokenType | null;
	export let amount: number;
	$: actualAmount = token ? parseUnits(`${amount}`, parseInt(token.decimals)) : 0;

	async function sign() {
		if ($walletClient?.signMessage && $walletAccount && token && amount >= 0) {
			const res = await chainpay.createTransaction({
				walletClient: $walletClient,
				account: $walletAccount,
				token: token.id,
				amount: actualAmount,
				data_string: Date.now().toString(),
				type: 'viem'
			});

			if (res) {
				window.open(`/pay/${res.encoded}`, '_blank')?.focus();
			}
		}
	}
</script>

<button class="secondary" on:click={sign}>
	{#if token && amount >= 0}
		Create payment request
	{:else}
		Select a token and amount
	{/if}
</button>
