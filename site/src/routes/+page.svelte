<script>
	import CreatePaymentRequest from '$lib/CreatePaymentRequest/CreatePaymentRequest.svelte';
</script>

<div class="initial-view select-none">
	<div class="flex flex-col sm:flex-row items-center sm:justify-center w-full h-full sm:gap-10">
		<div class="left mt-4 mb-10 sm:flex-1 flex flex-col justify-center">
			<h1 class="text-5xl text-center sm:text-right">ChainPay</h1>
			<p class="text-right mt-4">The free and open source on-chain payment provider</p>

			<div class="justify-end w-full mt-6 hidden sm:flex">
				<button class="hover:bg-gray-900 py-3 px-5 transition border"> Developer docs </button>
			</div>
		</div>

		<div class="right sm:flex-1 flex">
			<div class="border p-4 w-80">
				<CreatePaymentRequest />
			</div>
		</div>
	</div>

	<div class="justify-center w-full mt-8 flex sm:hidden">
		<button class="hover:bg-gray-900 py-3 px-5 transition border"> Developer docs </button>
	</div>
</div>

<style>
	div.initial-view {
		@media only screen and (min-width: 640px) {
			height: 80vh;
		}
	}
</style>
