<script lang="ts">
	import chainpay from 'chainpay';
	import { walletAccount, walletClient } from '../stores/auth/store';
	import type { TokenType } from '../../app';
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
				data_string: Date.now().toString()
			});

			if (res) {
				window.open(`/pay/${res.encoded}`, '_blank')?.focus();
			}
		}
	}
</script>

<button class="border mt-6 w-full h-10 hover:bg-gray-900 transition" on:click={() => sign()}
	>Create payment request</button
>
