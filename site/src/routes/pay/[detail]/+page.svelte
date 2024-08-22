<script lang="ts">
	import type { TransactionType } from 'chainpay';

	export let data:
		| {
				success: false;
		  }
		| {
				success: true;
				transactionDetails: TransactionType;
		  };
	console.log(data);
</script>
