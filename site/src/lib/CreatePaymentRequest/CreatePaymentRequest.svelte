<script lang="ts">
	import TokenPicker from '../TokenPicker.svelte';
	import type { TokenType } from '../../app';
	import TokenInputAmount from '../TokenInputAmount.svelte';
	import Wallet from '../Wallet.svelte';
	import ConnectButton from './ConnectButton.svelte';
	import ChangeNetworkButton from './ChangeNetworkButton.svelte';
	import CreatePaymentRequestButton from './CreatePaymentRequestButton.svelte';

	let toReceive: TokenType | null = null;
	$: decimals = toReceive ? parseInt(toReceive.decimals) : 0;
	let amount: number = 0;
</script>

<h2 class="text-xl">
	Create payment request

	<div class="text-base mt-3">
		<p>Pick a token to receive</p>
		<TokenPicker on:change={(e) => (toReceive = e.detail)} />
	</div>

	<div class="text-base mt-3">
		<p>How much tokens?</p>
		<TokenInputAmount {decimals} on:change={(e) => (amount = e.detail)} />
	</div>

	<div class="text-lg">
		<Wallet>
			<ConnectButton slot="NotConnected" />
			<ChangeNetworkButton slot="WrongNetwork" />
			<CreatePaymentRequestButton />
		</Wallet>
	</div>
</h2>
