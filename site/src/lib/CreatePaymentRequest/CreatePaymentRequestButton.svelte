<script lang="ts">
	import chainpay from 'chainpay';
	import { walletAccount, walletClient } from '../stores/auth/store';

	async function sign() {
		if ($walletClient?.signMessage && $walletAccount) {
			const res = await chainpay.createTransaction({
				walletClient: $walletClient,
				account: $walletAccount,
				token: $walletAccount,
				amount: 0,
				data_string: ''
			});
		}
	}
</script>

<button class="border mt-6 w-full h-10 hover:bg-gray-900 transition" on:click={() => sign()}
	>Create payment request</button
>
