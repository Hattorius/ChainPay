<script lang="ts">
	import { useAuth } from './stores/auth/methods';

	const { connect } = useAuth();
</script>

<button class="border mt-6 w-full h-10 hover:bg-gray-900 transition" on:click={() => connect()}
	>Connect wallet</button
>
