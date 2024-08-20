<script lang="ts">
	import { useAuth } from './stores/auth/methods';

	const { connect } = useAuth();
</script>

<h1 class="text-3xl text-center">ChainPay</h1>

<p class="text-center">Accept payments anywhere, open source, on chain</p>
<p class="text-center mt-4">Now available on Binance chain</p>

<div class="flex justify-center mt-2">
	<button
		class="p-2 bg-blue-500 rounded hover:bg-blue-700 active:bg-blue-400"
		on:click={() => connect()}>Connect to start</button
	>
</div>
