<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

<button {...$$props} on:click={(e) => dispatch('click', e)}><slot /></button>

<style>
	button {
		background: transparent;
		border: 2px solid #aa72ce;
		border-radius: 20px;
		padding: 13px 26px;

		font-size: 16px;
		font-weight: 500;

		cursor: pointer;
		text-transform: uppercase;
	}
</style>
