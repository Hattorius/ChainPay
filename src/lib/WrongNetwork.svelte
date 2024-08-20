<script lang="ts">
	import { useAuth } from './stores/auth/methods';
	import { activeChain, walletAccount } from './stores/auth/store';
	import { Chains } from './stores/auth/types';

	const { switchChain } = useAuth();

	async function switchToBNB() {
		$activeChain = Chains.BSC;
		if ($walletAccount) switchChain($activeChain);
	}
</script>

<h1 class="text-3xl text-center">ChainPay</h1>

<p class="text-center">Accept payments anywhere, open source, on chain</p>
<p class="text-center mt-4">Now available on Binance chain</p>

<div class="flex justify-center mt-2">
	<button
		class="p-2 bg-blue-500 rounded hover:bg-blue-700 active:bg-blue-400"
		on:click={switchToBNB}>Switch to Binance chain</button
	>
</div>
