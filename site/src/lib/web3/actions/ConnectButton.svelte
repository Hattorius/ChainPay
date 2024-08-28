<script lang="ts">
	import { useAuth } from '$lib/web3/methods';

	const { connect } = useAuth();
</script>

<button class="secondary" on:click={() => connect()}>Connect wallet</button>
