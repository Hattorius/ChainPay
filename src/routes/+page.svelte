<script lang="ts">
	import NotConnected from '$lib/NotConnected.svelte';
	import PaymentAcceptForm from '$lib/PaymentAcceptForm.svelte';
	import { walletAccount, walletClient } from '$lib/stores/auth/store';
	import WrongNetwork from '$lib/WrongNetwork.svelte';

	let isBsc = false;

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
</script>

<div class=" bg-gray-900 w-full h-screen text-white flex justify-center">
	<div class="flex flex-col gap-1 border-gray-800 rounded border w-1/2 h-auto p-5">
		{#if $walletAccount}
			{#if !isBsc}
				<WrongNetwork />
			{:else}
				<PaymentAcceptForm />
			{/if}
		{:else}
			<NotConnected />
		{/if}
	</div>
</div>
