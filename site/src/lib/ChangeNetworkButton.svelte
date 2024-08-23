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

<button class="border mt-6 w-full h-10 hover:bg-gray-900 transition" on:click={() => switchToBNB()}
	>Switch to Binance chain</button
>
