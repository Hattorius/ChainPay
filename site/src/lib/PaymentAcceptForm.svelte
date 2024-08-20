<script lang="ts">
	import { accountENS, walletAccount } from '$lib/stores/auth/store';
	import { useAuth } from './stores/auth/methods';

	const { disconnect } = useAuth();
</script>

<div class="gap-2 flex flex-col">
	<p>Address: {$walletAccount}</p>
	{#if $accountENS}
		<p>Account ENS: {$accountENS}</p>
	{/if}
	<button
		class="p-2 bg-blue-500 rounded hover:bg-blue-700 active:bg-blue-400"
		on:click={() => disconnect()}>Disconnect</button
	>
</div>
