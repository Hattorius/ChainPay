<script>
	import Hero from '$lib/sections/Hero.svelte';
	import { onMount } from 'svelte';

	import * as THREE from 'three';

	onMount(() => {
		window.three = THREE;
	});
</script>

<Hero></Hero>
