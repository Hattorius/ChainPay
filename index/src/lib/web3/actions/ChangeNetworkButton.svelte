<script lang="ts">
	import ButtonSecondary from '$lib/ButtonSecondary.svelte';
	import { useAuth } from '$lib/web3/methods';
	import { activeChain, walletAccount } from '$lib/web3/store';
	import { Chains } from '$lib/web3/types';

	const { switchChain } = useAuth();

	async function switchToBNB() {
		$activeChain = Chains.BSC;
		if ($walletAccount) switchChain($activeChain);
	}
</script>

<ButtonSecondary on:click={switchToBNB}>Switch to Binance chain</ButtonSecondary>
