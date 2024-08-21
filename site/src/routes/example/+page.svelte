<script lang="ts">
	import NotConnected from '$lib/NotConnected.svelte';
	import PaymentAcceptForm from '$lib/PaymentAcceptForm.svelte';
	import Wallet from '$lib/Wallet.svelte';
	import WrongNetwork from '$lib/WrongNetwork.svelte';
</script>

<Wallet>
	<PaymentAcceptForm />
	<WrongNetwork slot="WrongNetwork" />
	<NotConnected slot="NotConnected" />
</Wallet>
