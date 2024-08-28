<script lang="ts">
	import PayWidget from '$lib/PayWidget.svelte';

	import type { TransactionType } from 'chainpay';
	import { onMount } from 'svelte';

	import CELLS from 'vanta/dist/vanta.cells.min';

	export let data:
		| {
				success: false;
		  }
		| {
				success: true;
				embed: boolean;
				transactionDetails: TransactionType;
		  };

	let bg: HTMLDivElement;

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

<div class="bg" bind:this={bg} />

<div class="content">
	{#if data.success}
		<PayWidget transaction={data.transactionDetails} />
	{/if}
</div>

<style lang="scss">
	div.bg {
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

	div.content {
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
	}
</style>
