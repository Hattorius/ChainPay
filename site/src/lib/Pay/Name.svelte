<script lang="ts">
	import { createEthPublicClient } from '$lib/stores/auth/store';
	import { onMount } from 'svelte';

	export let address: string;
	let name = `${address.substring(0, 6)}...${address.substring(38)}`;

	onMount(() => {
		(async () => {
			const ens = await createEthPublicClient().getEnsName({ address: address as `0x${string}` });
			if (ens && ens !== null) {
				name = ens;
			}
		})();
	});
</script>

{name}
