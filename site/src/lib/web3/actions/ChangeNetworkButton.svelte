<script lang="ts">
	import { useAuth } from '$lib/web3/methods';
	import { activeChain, walletAccount } from '$lib/web3/store';
	import { Chains } from '$lib/web3/types';

	const { switchChain } = useAuth();

	async function switchToBNB() {
		$activeChain = Chains.BSC;
		if ($walletAccount) switchChain($activeChain);
	}
</script>

<button class="secondary" on:click={switchToBNB}>Switch to Binance chain</button>
