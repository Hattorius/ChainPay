<script lang="ts">
	import ImageLazyLoad from '$lib/ImageLazyLoad.svelte';
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
		<ImageLazyLoad src={image} alt="Diagram showing how ChainPay works" {root} />
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
			padding-left: 17px;
			margin-top: 40px;

			:global(li) {
				line-height: 26px;

				&::marker {
					color: #aa72ce;
				}
			}
		}
	}
</style>
