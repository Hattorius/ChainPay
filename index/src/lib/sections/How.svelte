<script lang="ts">
	import { onMount } from 'svelte';

	export let image;
	let root: HTMLDivElement;

	onMount(() => (root = document.querySelector('div') as HTMLDivElement));
</script>

<div class="how">
	<div class="left">
		<slot />
	</div>

	<div class="right">
		<img src={image} alt="Diagram showing how ChainPay works" />
	</div>
</div>

<style lang="scss">
	div.how {
		max-width: 890px;
		width: 100%;
		margin: 70px auto;

		display: flex;
		justify-content: space-between;

		:global(ul) {
			margin-top: 40px;
		}
	}
</style>
