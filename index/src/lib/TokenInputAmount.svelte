<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import parseNumericInput from '$lib/scripts/parseNumericInput';
	import Input from './Input.svelte';
	export let decimals: number;
	let value = '';
	const dispatch = createEventDispatcher();

	const handle = () => {
		value = parseNumericInput(value, decimals);
		let number = parseFloat(value);
		dispatch('change', isNaN(number) ? 0 : number);
	};
</script>

<Input type="text" on:keyup={handle} bind:value placeholder="Ex. 5.55" />
