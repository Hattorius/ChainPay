<script>
	import Cases from '$lib/sections/Cases.svelte';
	import DevBg from '$lib/sections/DevBG.svelte';
	import Features from '$lib/sections/Features.svelte';
	import Hero from '$lib/sections/Hero.svelte';
	import How from '$lib/sections/How.svelte';
	import Info from '$lib/sections/Info.svelte';
	import Roadmap from '$lib/sections/Roadmap.svelte';
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

<Cases />

<DevBg>
	<h2>Developer-Friendly Integration</h2>

	<p class="info-text">
		ChainPay is built with developers in mind. Easily integrate our contract to handle automatic
		token swaps for payments within your DApp or service. No need to worry about managing liquidity
		or token conversions.
	</p>

	<a href="https://hattorius.github.io/ChainPay" target="_blank" class="dev-docs">
		<button>Developer docs</button>
	</a>
</DevBg>

<Roadmap />

<Info>
	<h2>Join the Community</h2>

	<div class="social">
		<a href="https://github.com/Hattorius/ChainPay" target="_blank">
			<img src="/github.svg" alt="Github repository" />
		</a>

		<a href="https://discord.gg/2MqVeKMPpr" target="_blank">
			<img src="/discord.svg" alt="Discord guild" />
		</a>
	</div>
</Info>

<p class="copy">
	Copyright ChainPay & contributors {new Date().getFullYear()}
</p>

<style lang="scss">
	.info-text {
		padding-top: 17px;
	}

	.dev-docs > button {
		margin-top: 44px;
	}

	.social {
		margin-top: 30px;
		margin-bottom: 230px;
		display: flex;
		gap: 50px;
		justify-content: center;

		img {
			height: 48px;
		}
	}

	p.copy {
		text-align: center;
		margin-bottom: 10px;
		font-size: 12px;
	}
</style>
