<script>
	import DevelopersButton from '$lib/DevelopersButton.svelte';

	let activeUseCase = 0;
</script>

<div class="max-w-xl mx-auto px-2 text-center pt-12 pb-9 sm:pt-9 sm:pb-16">
	<div class="flex justify-center">
		<h2 class="text-3xl mb-2 border-b pb-1">What is ChainPay?</h2>
	</div>

	<p>
		ChainPay is an open-source payment solution deployed on Binance Smart Chain (BSC) that allows
		users and contracts to receive payments in any token of their choice. It automatically swaps the
		sender's token to the recipient's preferred token, simplifying multi-token payments.
	</p>
</div>

<div class="py-9 sm:py-16">
	<div class="border w-max p-4 mx-auto">
		<h2 class="text-3xl mb-2 text-center">Key Features</h2>

		<div
			class="flex flex-col sm:flex-row justify-center gap-5 sm:gap-10 mt-2 max-w-full sm:grid sm:grid-cols-2 xl:flex"
		>
			<div class="text-center w-64">
				<h3 class="text-xl">Token Flexibility</h3>
				<p>
					Send and receive payments in any supported token, regardless of what token the sender
					holds.
				</p>
			</div>

			<div class="border-t w-full block sm:hidden" />

			<div class="text-center w-64">
				<h3 class="text-xl">Automatic Swaps</h3>
				<p>Integrated with PancakeSwap for seamless swaps between tokens during payments.</p>
			</div>

			<div class="border-t w-full block sm:hidden" />

			<div class="text-center w-64">
				<h3 class="text-xl">Developer Friendly</h3>
				<p>Open-source, easy-to-integrate with robust developer documentation.</p>
			</div>

			<div class="border-t w-full block sm:hidden" />

			<div class="text-center w-64">
				<h3 class="text-xl">Future-Ready</h3>
				<p>
					Currently on BSC, but designed to expand to multiple EVM chains and support complex
					bridges and multi-hop swaps in future releases.
				</p>
			</div>
		</div>
	</div>
</div>

<div class="pb-9 pt-12 sm:py-18">
	<h2 class="text-3xl mb-6 text-center">How it works</h2>

	<div class="flex flex-col-reverse sm:flex-row gap-10">
		<div class="flex-1 flex flex-col justify-center text-left sm:text-right px-2 sm:px-0">
			<ul class="list-disc list-inside sm:rtl">
				<li>You create an unsigned transaction</li>
				<li>The recipient of the token / BNB signs the transaction</li>
				<li>A different user pays to the ChainPay contract</li>
				<li>We do our magic in real time & send you your tokens</li>
			</ul>

			<p class="mt-2 sm:text-right">All on chain</p>
		</div>

		<div class="flex-1 px-2 sm:px-0">
			<img class="w-full max-w-lg" src="/diagram.svg" alt="Diagram showing how ChainPay works" />
		</div>
	</div>
</div>

<div class="pb-9 pt-12 w-full max-w-4xl mx-auto sm:py-18 px-2">
	<h2 class="text-3xl mb-6 text-left">Use Cases</h2>

	<div class="flex flex-col md:flex-row">
		<div class="flex flex-col">
			<button
				on:click={() => (activeUseCase = 0)}
				class={(activeUseCase === 0 ? 'active ' : 'hover:bg-gray-900 ') +
					'border-y border-l py-2 px-4 transition border-r md:border-r-0'}
				>Freelancers & Consultants</button
			>
			<button
				on:click={() => (activeUseCase = 1)}
				class={(activeUseCase === 1 ? 'active ' : 'hover:bg-gray-900 ') +
					'border-b border-l py-2 px-4 transition border-r md:border-r-0'}>DAOs & DApps</button
			>
			<button
				on:click={() => (activeUseCase = 2)}
				class={(activeUseCase === 2 ? 'active ' : 'hover:bg-gray-900 ') +
					'md:border-b border-l py-2 px-4 transition border-r md:border-r-0'}
				>Merchants & Online Stores</button
			>
		</div>

		<div class="flex-1 border p-4">
			<h3 class="text-xl">Problem</h3>
			<p class="mb-2">
				{#if activeUseCase === 0}
					Freelancers and consultants often work with clients worldwide, and payments in crypto
					offer a fast and borderless alternative to traditional banking systems. However, the
					variety of tokens in circulation can make it difficult to manage income when clients pay
					in different tokens. Freelancers may prefer stablecoins or a specific token to avoid price
					volatility or to match their investment portfolios, but they often receive payments in
					whichever token the client holds.
				{:else if activeUseCase === 1}
					Decentralized Autonomous Organizations and decentralized applications often have complex
					treasury management systems where they operate with a variety of tokens. When paying
					contributors, developers, or service providers, they may want to make payments in a
					specific token that aligns with their governance or operational structure. Conversely,
					contributors may want to receive payments in different tokens depending on their personal
					preferences or investment strategy.
				{:else if activeUseCase === 2}
					Crypto payments offer a tremendous advantage for merchants, especially for international
					transactions, but many businesses face challenges accepting multiple cryptocurrencies.
					Merchants want the ability to accept a variety of tokens to cater to a broader customer
					base but may prefer to receive payments in a stable token like USDT or a specific
					cryptocurrency like ETH or BTC. Managing manual swaps, liquidity, and fluctuating prices
					is cumbersome and time-consuming for businesses that should be focused on running their
					operations.
				{/if}
			</p>

			<h3 class="text-xl">ChainPay Solution</h3>
			<p class="mb-2">
				{#if activeUseCase === 0}
					With ChainPay, freelancers can request payments in their preferred token (e.g., USDT,
					BUSD, or any other stablecoin) regardless of what the client holds. Clients are free to
					pay using any token in their wallet, and ChainPay automatically converts it to the token
					chosen by the freelancer via PancakeSwap.
				{:else if activeUseCase === 1}
					ChainPay simplifies this complexity by enabling DAOs and DApps to make payments in their
					preferred tokens, while contributors can receive them in the token of their choice. This
					eliminates the need for DAO treasuries to hold large amounts of multiple tokens or for
					contributors to manage manual swaps after receiving payments.
				{:else if activeUseCase === 2}
					ChainPay allows merchants to accept payments in any token, while automatically converting
					it into the merchant's preferred token at the time of the transaction. Whether a customer
					pays in a highly volatile altcoin or a popular token like BNB or BUSD, the merchant can
					rest assured that they will receive the funds in their chosen token without the risk of
					price volatility or the need for manual token swaps.
				{/if}
			</p>

			<h3 class="text-xl">Example</h3>
			<p class="mb-2">
				{#if activeUseCase === 0}
					Sarah, a graphic designer, prefers to receive payments in BUSD to avoid market volatility.
					Her client, however, holds their assets in BNB and prefers to pay with it. Using ChainPay,
					Sarah creates a payment request in BUSD. When her client pays in BNB, ChainPay handles the
					conversion automatically, and Sarah receives the equivalent amount in BUSD without needing
					to manually swap tokens on an exchange.
				{:else if activeUseCase === 1}
					The XYZ DAO holds its funds in governance tokens (XYZ Tokens) but has contributors
					worldwide who prefer to be paid in more liquid assets like ETH, USDC, or DAI. By
					integrating ChainPay, XYZ DAO can continue to pay in XYZ tokens, while contributors
					automatically receive the equivalent amount in their preferred token, no matter what they
					choose.
				{:else if activeUseCase === 2}
					John runs an online electronics store that accepts crypto payments. To cater to his
					tech-savvy customers, he decides to allow payments in a wide range of tokens, including
					BNB, CAKE, and DOGE. However, John prefers to receive payments in USDT to avoid the risk
					of price fluctuations. With ChainPay integrated into his store's payment gateway,
					customers can pay in any token they hold, and John automatically receives the equivalent
					amount in USDT, simplifying his accounting process.
				{/if}
			</p>

			<h3 class="text-xl">Benefits</h3>
			<ul class="list-disc list-inside">
				{#if activeUseCase === 0}
					<li>Eliminates the need for freelancers to manually swap received tokens.</li>
					<li>Protects freelancers from market volatility by allowing payments in stablecoins.</li>
					<li>Increases client flexibility by accepting payments in any token.</li>
				{:else if activeUseCase === 1}
					<li>Streamlines payment processes in multi-token environments.</li>
					<li>Reduces the complexity of managing multiple token types for treasuries.</li>
					<li>Ensures contributors are paid in their preferred token, improving satisfaction.</li>
					<li>
						Integrates seamlessly into the DAO's payment system with minimal overhead. (soon?)
					</li>
				{:else if activeUseCase === 2}
					<li>
						Expands payment options for customers, increasing the chances of completing sales.
					</li>
					<li>Reduces merchant exposure to token price volatility.</li>
					<li>Simplifies the backend process by eliminating the need for manual swaps.</li>
					<li>
						Provides flexibility to merchants to receive payments in stablecoins or other desired
						tokens.
					</li>
				{/if}
			</ul>
		</div>
	</div>
</div>

<div class="max-w-xl mx-auto px-2 text-center pt-12 pb-9 sm:py-18">
	<div class="flex justify-center">
		<h2 class="text-3xl mb-2 pb-1">Developer-Friendly Integration</h2>
	</div>

	<p>
		ChainPay is built with developers in mind. Easily integrate our contract to handle automatic
		token swaps for payments within your DApp or service. No need to worry about managing liquidity
		or token conversions.
	</p>

	<div class="flex justify-center mt-4">
		<DevelopersButton />
	</div>
</div>

<div class="pb-9 pt-12 w-full max-w-2xl mx-auto sm:py-18">
	<h2 class="text-3xl mb-6 text-center">Roadmap & Future Plans</h2>

	<div class="flex flex-col sm:flex-row mb-4 px-2 sm:px-0">
		<div class="text-center sm:text-right sm:pr-4">
			<h3 class="text-xl">Version 0.1</h3>
			<small>(current)</small>
		</div>
		<div class="flex-1 sm:border-l pl-4">
			<ul class="list-disc list-inside">
				<li>Backend APIs for developers to integrate payment creation functionality</li>
				<li>Payment support for selected tokens using specific PancakeSwap pools</li>
				<li>Accept payments to both wallets and smart contracts</li>
				<li>Basic documentation and examples for developer integration</li>
				<li>Demo widget for testing payment functionality</li>
			</ul>
		</div>
	</div>

	<div class="flex flex-col sm:flex-row mb-4 px-2 sm:px-0">
		<div class="text-center sm:text-right sm:pr-4">
			<h3 class="text-xl">Version 0.2</h3>
		</div>
		<div class="flex-1 sm:border-l pl-4">
			<ul class="list-disc list-inside">
				<li>Allow smart contracts to initiate and send payments</li>
				<li>Expand support for additional tokens and liquidity pools</li>
				<li>Support multi-hop swaps for more efficient token conversion</li>
				<li>Implement basic logging and transaction monitoring for payment tracking</li>
				<li>Upgrade developer documentation with code snippets and SDK examples</li>
			</ul>
		</div>
	</div>

	<div class="flex flex-col sm:flex-row mb-4 px-2 sm:px-0">
		<div class="text-center sm:text-right sm:pr-4">
			<h3 class="text-xl">Version 0.3</h3>
		</div>
		<div class="flex-1 sm:border-l pl-4">
			<ul class="list-disc list-inside">
				<li>
					Deploy ChainPay on additional EVM-compatible blockchains (e.g., Ethereum, Polygon,
					Avalanche)
				</li>
				<li>Expand supported tokens and pools across new chains</li>
				<li>Integrate gas fee optimization mechanisms for cost-effective transactions</li>
				<li>
					Provide detailed transaction analytics for developers (e.g., success rates, swap
					efficiency)
				</li>
			</ul>
		</div>
	</div>

	<div class="flex flex-col sm:flex-row mb-4 px-2 sm:px-0">
		<div class="text-center sm:text-right sm:pr-4">
			<h3 class="text-xl">Version 1.0</h3>
		</div>
		<div class="flex-1 sm:border-l pl-4">
			<ul class="list-disc list-inside">
				<li>
					Introduce cross-chain payment support utilizing bridges for seamless multi-chain
					interactions
				</li>
				<li>
					Allow payment batching to reduce transaction costs (e.g., aggregate multiple payments into
					a single transaction)
				</li>
				<li>
					Implement customizable fee structures for projects integrating ChainPay (e.g., revenue
					sharing or flat fees)
				</li>
				<li>
					Launch a governance mechanism to enable the community to vote on new features and
					supported chains??
				</li>
				<li>Security audit by a third-party provider to ensure contract robustness</li>
			</ul>
		</div>
	</div>
</div>

<div class="max-w-xl mx-auto px-2 text-center py-12">
	<div class="flex justify-center">
		<h2 class="text-3xl pb-1">Join the Community</h2>
	</div>

	<div class="flex justify-center mt-4 gap-10">
		<a href="https://github.com/Hattorius/ChainPay" target="_blank">
			<img src="/github.svg" class="h-12" alt="Github link" />
		</a>

		<a href="TODO: CREATE ONE" target="_blank">
			<img src="/discord.svg" class="h-12" alt="Discord link" />
		</a>
	</div>
</div>

<style>
	button.active {
		background: #fff;
		color: #000;
	}
</style>
