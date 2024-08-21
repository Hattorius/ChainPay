<script lang="ts">
	import { walletAccount, walletClient } from '$lib/stores/auth/store';
	import { onMount } from 'svelte';
	import AuthProvider from './stores/auth/AuthProvider.svelte';

	let isBsc = false;
	let show = false;

	$: {
		(async () => {
			const chainId = await $walletClient?.getChainId().catch((_) => {});
			if (chainId) {
				if (chainId === 56) {
					isBsc = true;
					return;
				}
			}
			isBsc = false;
		})();
	}

	onMount(() => {
		show = true;
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
