<script>
	import DevelopersButton from './../lib/DevelopersButton.svelte';
	import CreatePaymentRequest from '$lib/CreatePaymentRequest/CreatePaymentRequest.svelte';
	import Index from '$lib/pages/Index.svelte';
</script>

<div class="initial-view select-none">
	<div class="flex flex-col sm:flex-row items-center sm:justify-center w-full h-full sm:gap-10">
		<div class="left mt-4 mb-10 sm:flex-1 flex flex-col justify-center">
			<h1 class="text-5xl text-center sm:text-right">ChainPay</h1>
			<p class="text-center sm:text-right mt-4 max-w-md ml-auto">
				Automate token swaps with ease, pay any recipient in the token they want—ChainPay simplifies
				payments on BSC, with more chains coming soon.
			</p>

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
		<DevelopersButton />
	</div>
</div>

<Index />

<style>
	div.initial-view {
		@media only screen and (min-width: 640px) {
			height: 60vh;
		}

		@media only screen and (min-width: 1921px) {
			height: 40vh;
		}
	}
</style>
