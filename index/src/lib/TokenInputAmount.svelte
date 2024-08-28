<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import parseNumericInput from '$lib/scripts/parseNumericInput';
	export let decimals: number;
	let value = '';
	const dispatch = createEventDispatcher();

	const handle = () => {
		value = parseNumericInput(value, decimals);
		let number = parseFloat(value);
		dispatch('change', isNaN(number) ? 0 : number);
	};
</script>

<input type="text" on:keyup={handle} bind:value placeholder="Ex. 5.55" />

<style lang="scss">
	@media screen and (max-width: 450px) {
		input {
			width: 320px;
		}
	}

	@media screen and (max-width: 420px) {
		input {
			width: 280px;
		}
	}
</style>
