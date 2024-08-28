<script lang="ts">
	import chainpay from 'chainpay';

	import type { TransactionType } from 'chainpay';
	import tokens from './scripts/tokens';
	import TokenPicker from './TokenPicker.svelte';
	import type { TokenType } from '../app';
	import { formatUnits } from 'viem';
	import { onMount } from 'svelte';
	import getPrice from './scripts/getPrice';
	import Wallet from './web3/Wallet.svelte';
	import ConnectButton from './web3/actions/ConnectButton.svelte';
	import ChangeNetworkButton from './web3/actions/ChangeNetworkButton.svelte';
	import Pay from './web3/actions/Pay.svelte';

	export let transaction: TransactionType;

	let payingTokenPrice = 0;
	let receivingTokenPrice = 0;
	let toSend: TokenType | null = null;
	let isDifferent = false;
	let paymentDue: bigint | undefined;
	let paid = false;

	$: CHAINPAY_CONTRACT = chainpay.constants.CHAINPAY_CONTRACT_ADDRESS as `0x${string}`;
	$: paymentAmount = paymentDue ? paymentDue : BigInt(0);
	$: buttonText =
		toSend !== null
			? !isDifferent
				? `Pay ${
						parseInt(
							(
								parseFloat(
									formatUnits(
										BigInt(transaction.amount),
										parseInt(tokens.get(transaction.token).decimals)
									)
								) * 10000000
							).toString()
						) / 10000000
					}
			${tokens.get(transaction.token).symbol}`
				: paymentDue
					? `Pay max ${
							parseInt(
								(
									parseFloat(formatUnits(paymentDue, parseInt(tokens.get(toSend.id).decimals))) *
									10000000
								).toString()
							) / 10000000
						}
			${tokens.get(toSend.id).symbol}`
					: 'Wait1'
			: 'Wait2';

	$: {
		paymentDue = undefined;
		if (toSend !== null && isDifferent && payingTokenPrice !== 0 && receivingTokenPrice !== 0) {
			const transactionAmountInUSD =
				(Number(transaction.amount) /
					Math.pow(10, parseInt(tokens.get(transaction.token).decimals))) *
				receivingTokenPrice;

			const toSendAmount =
				(transactionAmountInUSD / payingTokenPrice) * Math.pow(10, parseInt(toSend.decimals));

			paymentDue = BigInt(Math.round(toSendAmount * 1.05)); // Huge 5% slippage
		}
	}

	const onTokenPick = (e: CustomEvent<TokenType>) => {
		toSend = e.detail;

		if (toSend.id !== transaction.token) {
			isDifferent = true;
			if (receivingTokenPrice === 0) {
				(async () => {
					receivingTokenPrice = (await getPrice(transaction.token)) ?? 0;
				})();
			}
			(async () => {
				payingTokenPrice = (await getPrice(toSend.id)) ?? 0;
			})();
		} else {
			isDifferent = false;
		}
	};

	onMount(() => {
		(async () => {
			paid = await chainpay.isPaid(CHAINPAY_CONTRACT, transaction.signature);
		})();
	});
</script>

<div class="wrapper">
	<div class="widget">
		{#if !paid}
			<h3>Pay payment request</h3>

			<div class="input">
				<TokenPicker
					tokens={[tokens.get(transaction.token), ...tokens.getPaired(transaction.token)]}
					on:change={onTokenPick}
					textToShow="Token to pay with"
				/>
			</div>

			<div class="btn">
				{#if toSend === null}
					<button class="secondary"> Please select a token </button>
				{:else}
					<Wallet>
						<ConnectButton slot="NotConnected" />
						<ChangeNetworkButton slot="WrongNetwork" />
						{#if (isDifferent && paymentDue) || !isDifferent}
							{#key toSend}
								<Pay
									{transaction}
									{CHAINPAY_CONTRACT}
									token={toSend.id}
									amount={paymentAmount}
									symbol={toSend.symbol}
								>
									{buttonText}
								</Pay>
							{/key}
						{/if}
					</Wallet>
				{/if}
			</div>
		{:else}
			This request has already been paid
		{/if}
	</div>
</div>

<style lang="scss">
	div.wrapper {
		padding-top: 40px;
	}

	div.widget {
		max-width: 350px;
		width: 100%;
		margin: 0 auto;
		background: #1d263b;
		border-radius: 20px;
		padding: 20px;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		position: relative;
		z-index: 4;
	}

	div.input {
		padding-top: 20px;
	}

	div.btn {
		padding-top: 40px;
	}
</style>
