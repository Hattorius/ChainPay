<script lang="ts">
	import ButtonPrimary from '$lib/ButtonPrimary.svelte';
	import ButtonSecondary from '$lib/ButtonSecondary.svelte';
	import H1 from '$lib/H1.svelte';
	import H3 from '$lib/H3.svelte';
	import tokens from '$lib/scripts/tokens';
	import Subtitle from '$lib/Subtitle.svelte';
	import TokenInputAmount from '$lib/TokenInputAmount.svelte';
	import TokenPicker from '$lib/TokenPicker.svelte';
	import ChangeNetworkButton from '$lib/web3/actions/ChangeNetworkButton.svelte';
	import ConnectButton from '$lib/web3/actions/ConnectButton.svelte';
	import CreatePaymentRequestButton from '$lib/web3/actions/CreatePaymentRequestButton.svelte';
	import Wallet from '$lib/web3/Wallet.svelte';
	import type { TokenType } from '../../app';

	import { onMount } from 'svelte';

	import CELLS from 'vanta/dist/vanta.cells.min';

	let bg: HTMLDivElement;

	let toReceive: TokenType | null = null;
	$: decimals = toReceive ? parseInt(toReceive.decimals) : 0;
	let amount: number = 0;

	onMount(() => {
		CELLS({
			el: bg,
			mouseControls: false,
			touchControls: false,
			gyroControls: false,
			minHeight: 200.0,
			minWidth: 200.0,
			scale: 1.0,
			color1: 0x227f9e,
			color2: 0xaa72ce,
			size: 4.0,
			speed: 1.0
		});
	});
</script>

<div class="hero">
	<div class="left">
		<H1>ChainPay</H1>

		<Subtitle>
			Effortless Crypto Payments,<br />
			In Any Token, Your Way
		</Subtitle>

		<div class="holder">
			<a href="https://hattorius.github.io/ChainPay" target="_blank">
				<ButtonPrimary>Developer docs</ButtonPrimary>
			</a>
		</div>
	</div>

	<div class="right">
		<div class="card">
			<H3>Create payment request</H3>

			<div>
				<TokenPicker tokens={tokens.getAll()} on:change={(e) => (toReceive = e.detail)} />
			</div>

			<div>
				<TokenInputAmount {decimals} on:change={(e) => (amount = e.detail)} />
			</div>

			<div>
				<Wallet>
					<ConnectButton slot="NotConnected" />
					<ChangeNetworkButton slot="WrongNetwork" />
					<CreatePaymentRequestButton token={toReceive} {amount} />
				</Wallet>
			</div>
		</div>
	</div>

	<div class="canvas" bind:this={bg} />
</div>

<style lang="scss">
	div.hero {
		max-width: 1024px;
		width: 100%;
		margin-top: 65px;
		margin-left: auto;
		margin-right: auto;
		display: flex;
		border-radius: 20px;
		background: rgba(217, 217, 217, 0.03);
		padding: 80px;
		overflow: hidden;
		position: relative;
		align-items: center;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background: linear-gradient(180deg, rgba(29, 38, 59, 0.6) 0%, rgba(29, 38, 59, 0.8));
			pointer-events: none;
			z-index: 2;
		}

		* {
			z-index: 3;
		}
	}

	div.left {
		flex: 1;
	}

	div.canvas {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1;
		background: transparent;
		pointer-events: none;
		width: 100%;
		height: 100%;
	}

	div.holder {
		margin-top: 38px;
	}

	div.card {
		background: #1d263b;
		border-radius: 20px;
		padding: 20px;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

		& > div {
			padding-top: 20px;

			&:last-child {
				padding-top: 40px;
			}
		}
	}
</style>
