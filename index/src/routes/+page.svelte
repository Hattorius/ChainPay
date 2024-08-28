<script>
	import Hero from '$lib/sections/Hero.svelte';
	import Info from '$lib/sections/Info.svelte';
	import { onMount } from 'svelte';

	import * as THREE from 'three';

	onMount(() => {
		window.three = THREE;
	});
</script>

<Hero />

<Info>
	<h1>What is it?</h1>

	<p>
		ChainPay is an open-source payment solution deployed on Binance Smart Chain that allows users and contracts to receive payments in any token of their choice. It automatically swaps the sender's token to the recipient's preferred token, simplifying multi-token payments.
	</p>
</Info>
