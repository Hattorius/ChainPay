<script lang="ts">
	import Logo from './../../../lib/Pay/Logo.svelte';
	import NotFound from '$lib/Pay/NotFound.svelte';
	import type { TransactionType } from 'chainpay';
	import Widget from '$lib/Pay/Widget.svelte';
	import Name from '$lib/Pay/Name.svelte';

	export let data:
		| {
				success: false;
		  }
		| {
				success: true;
				embed: boolean;
				transactionDetails: TransactionType;
		  };
</script>

{#if !data.success}
	<Logo />
	<NotFound />
{:else}
	{#if !data.embed}
		<Logo />
	{/if}

	<div class="w-80 mx-auto p-4" class:border={!data.embed} class:mt-6={!data.embed}>
		<Widget transaction={data.transactionDetails} />
	</div>

	<p class="text-center mt-2">
		Requested by <Name address={data.transactionDetails.recipient} />
	</p>
{/if}
