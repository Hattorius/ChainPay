<script lang="ts">
	import TokenPicker from '$lib/TokenPicker.svelte';
	import type { TransactionType } from 'chainpay';
	import type { TokenType } from '../../app';

	export let transaction: TransactionType;

	let toReceive: TokenType | null = null;
</script>

<div class="text-base">
	<p>Pick a token to pay with</p>
	<TokenPicker on:change={(e) => (toReceive = e.detail)} />
</div>
