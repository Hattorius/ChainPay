<script>
	import Features from '$lib/sections/Features.svelte';
	import Hero from '$lib/sections/Hero.svelte';
	import How from '$lib/sections/How.svelte';
	import Info from '$lib/sections/Info.svelte';
	import { onMount } from 'svelte';

	import * as THREE from 'three';

	onMount(() => {
		window.three = THREE;
	});
</script>

<Hero />

<Info>
	<h2>What is it?</h2>

	<p class="info-text">
		ChainPay is an open-source payment solution deployed on Binance Smart Chain that allows users
		and contracts to receive payments in any token of their choice. It automatically swaps the
		sender's token to the recipient's preferred token, simplifying multi-token payments.
	</p>
</Info>

<Features>
	<div>
		<h3>Token Flexibility</h3>

		<p>
			Send and receive payments in any supported token, regardless of what token the sender holds.
		</p>
	</div>

	<div />

	<div>
		<h3>Automatic Swaps</h3>

		<p>Integrated with PancakeSwap for seamless swaps between tokens during payments.</p>
	</div>

	<div />

	<div>
		<h3>Developer Friendly</h3>

		<p>Open-source, easy-to-integrate with robust developer documentation.</p>
	</div>

	<div />

	<div>
		<h3>Token Flexibility</h3>

		<p>
			Currently on BSC, but designed to expand to multiple EVM chains and support chain bridges in
			future releases.
		</p>
	</div>
</Features>

<How image="./diagram.svg">
	<h2>How it Works</h2>

	<ul>
		<li>You create an unsigned transaction</li>
		<li>The recipient of the token / BNB signs the transaction</li>
		<li>A different user pays to the ChainPay contract</li>
		<li>We do our magic in real time & send you your tokens</li>
	</ul>

	<p>All on chain</p>
</How>

<style>
	.info-text {
		padding-top: 17px;
	}
</style>
