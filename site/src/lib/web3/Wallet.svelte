<script lang="ts">
	import { walletAccount, walletClient } from './store';
	import { onMount, tick } from 'svelte';
	import AuthProvider from './AuthProvider.svelte';
	import { Chains } from './types';

	let isBsc = false;
	let show = false;

	$: {
		(async () => {
			const chainId = await $walletClient?.getChainId().catch((_) => {});
			if (chainId) {
				if (chainId === parseInt(Chains.BSC)) {
					isBsc = true;
					return;
				}
			}
			isBsc = false;
		})();
	}

	onMount(() => {
		(async () => {
			await tick();
			show = true;
		})();
	});
</script>

{#if show}
	<AuthProvider>
		{#if $walletAccount}
			{#if !isBsc}
				<slot name="WrongNetwork">
					<!-- TODO: CREATE FALL BACK -->
				</slot>
			{:else}
				<slot />
			{/if}
		{:else}
			<slot name="NotConnected">
				<!-- TODO: CREATE FALL BACK -->
			</slot>
		{/if}
	</AuthProvider>
{/if}
