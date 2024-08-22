<script>
	import CreatePaymentRequest from './CreatePaymentRequest/CreatePaymentRequest.svelte';
</script>

<div class="initial-view select-none">
	<div class="flex items-center justify-center w-full h-full gap-10">
		<div class="left flex-1 flex flex-col justify-center">
			<h1 class="text-5xl text-right">ChainPay</h1>
			<p class="text-right mt-4">The free and open source on-chain payment provider</p>

			<div class="flex justify-end w-full mt-6">
				<button class="hover:bg-gray-900 py-3 px-5 transition border"> Developer docs </button>
			</div>
		</div>

		<div class="right flex-1 flex">
			<div class="border p-4 min-w-80">
				<CreatePaymentRequest />
			</div>
		</div>
	</div>
</div>

<style>
	div.initial-view {
		height: 80vh;
	}
</style>
