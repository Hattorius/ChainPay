<script lang="ts">
	import { onMount } from 'svelte';

	let visible = false;
	let setSrc = '';

	export let src = '';
	export let alt = '';
	export let root: HTMLDivElement | null;

	let container: HTMLDivElement;
	let observer: IntersectionObserver;

	onMount(() => {
		observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setSrc = src;
					visible = true;
				}
			},
			{
				root,
				threshold: 0.1
			}
		);

		observer.observe(container);
		return () => observer && observer.disconnect();
	});
</script>

<div class="w-full h-full" bind:this={container}>
	<img src={setSrc} {alt} on:error={() => (setSrc = '/question.png')} />
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}

	img {
		width: 100%;
		height: 100%;
	}
</style>
