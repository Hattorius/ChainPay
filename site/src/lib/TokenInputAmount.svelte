<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import parseNumericInput from './parseNumericInput';
	export let decimals: number;
	let value = '';
	const dispatch = createEventDispatcher();

	const handle = () => {
		value = parseNumericInput(value, decimals);
		let number = parseFloat(value);
		dispatch('change', isNaN(number) ? 0 : number);
	};
</script>

<input type="text" class="bg-black border w-full h-10 p-2" on:keyup={handle} bind:value />
