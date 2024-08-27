<script lang="ts">
	import ButtonSecondary from '$lib/ButtonSecondary.svelte';
	import { useAuth } from '$lib/web3/methods';

	const { connect } = useAuth();
</script>

<ButtonSecondary on:click={() => connect()}>Connect wallet</ButtonSecondary>
