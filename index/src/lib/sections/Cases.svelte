<script>
	import Case from '$lib/Case.svelte';
</script>

<div class="cases">
	<h2>Use Cases</h2>

	<Case title="Freelancers & Consultants">
		<h3>Problem</h3>
		<p>
			Freelancers and consultants often work with clients worldwide, and payments in crypto offer a
			fast and borderless alternative to traditional banking systems. However, the variety of tokens
			in circulation can make it difficult to manage income when clients pay in different tokens.
			Freelancers may prefer stablecoins or a specific token to avoid price volatility or to match
			their investment portfolios, but they often receive payments in whichever token the client
			holds.
		</p>

		<h3>ChainPay Solution</h3>
		<p>
			With ChainPay, freelancers can request payments in their preferred token (e.g., USDT, BUSD, or
			any other stablecoin) regardless of what the client holds. Clients are free to pay using any
			token in their wallet, and ChainPay automatically converts it to the token chosen by the
			freelancer via PancakeSwap.
		</p>

		<h3>Example</h3>
		<p>
			Sarah, a graphic designer, prefers to receive payments in BUSD to avoid market volatility. Her
			client, however, holds their assets in BNB and prefers to pay with it. Using ChainPay, Sarah
			creates a payment request in BUSD. When her client pays in BNB, ChainPay handles the
			conversion automatically, and Sarah receives the equivalent amount in BUSD without needing to
			manually swap tokens on an exchange.
		</p>

		<h3>Benefits</h3>
		<ul>
			<li>Eliminates the need for freelancers to manually swap received tokens.</li>
			<li>Protects freelancers from market volatility by allowing payments in stablecoins.</li>
			<li>Increases client flexibility by accepting payments in any token.</li>
		</ul>
	</Case>

	<Case title="DAOs & DApps">
		<h3>Problem</h3>
		<p>
			Decentralized Autonomous Organizations and decentralized applications often have complex
			treasury management systems where they operate with a variety of tokens. When paying
			contributors, developers, or service providers, they may want to make payments in a specific
			token that aligns with their governance or operational structure. Conversely, contributors may
			want to receive payments in different tokens depending on their personal preferences or
			investment strategy.
		</p>

		<h3>ChainPay Solution</h3>
		<p>
			ChainPay simplifies this complexity by enabling DAOs and DApps to make payments in their
			preferred tokens, while contributors can receive them in the token of their choice. This
			eliminates the need for DAO treasuries to hold large amounts of multiple tokens or for
			contributors to manage manual swaps after receiving payments.
		</p>

		<h3>Example</h3>
		<p>
			The XYZ DAO holds its funds in governance tokens (XYZ Tokens) but has contributors worldwide
			who prefer to be paid in more liquid assets like ETH, USDC, or DAI. By integrating ChainPay,
			XYZ DAO can continue to pay in XYZ tokens, while contributors automatically receive the
			equivalent amount in their preferred token, no matter what they choose.
		</p>

		<h3>Benefits</h3>
		<ul>
			<li>Streamlines payment processes in multi-token environments.</li>
			<li>Reduces the complexity of managing multiple token types for treasuries.</li>
			<li>Ensures contributors are paid in their preferred token, improving satisfaction.</li>
			<li>Integrates seamlessly into the DAO's payment system with minimal overhead. (soon?)</li>
		</ul>
	</Case>

	<Case title="Merchants & Online Stores">
		<h3>Problem</h3>
		<p>
			Crypto payments offer a tremendous advantage for merchants, especially for international
			transactions, but many businesses face challenges accepting multiple cryptocurrencies.
			Merchants want the ability to accept a variety of tokens to cater to a broader customer base
			but may prefer to receive payments in a stable token like USDT or a specific cryptocurrency
			like ETH or BTC. Managing manual swaps, liquidity, and fluctuating prices is cumbersome and
			time-consuming for businesses that should be focused on running their operations.
		</p>

		<h3>ChainPay Solution</h3>
		<p>
			ChainPay allows merchants to accept payments in any token, while automatically converting it
			into the merchant's preferred token at the time of the transaction. Whether a customer pays in
			a highly volatile altcoin or a popular token like BNB or BUSD, the merchant can rest assured
			that they will receive the funds in their chosen token without the risk of price volatility or
			the need for manual token swaps.
		</p>

		<h3>Example</h3>
		<p>
			John runs an online electronics store that accepts crypto payments. To cater to his tech-savvy
			customers, he decides to allow payments in a wide range of tokens, including BNB, CAKE, and
			DOGE. However, John prefers to receive payments in USDT to avoid the risk of price
			fluctuations. With ChainPay integrated into his store's payment gateway, customers can pay in
			any token they hold, and John automatically receives the equivalent amount in USDT,
			simplifying his accounting process.
		</p>

		<h3>Benefits</h3>
		<ul>
			<li>Expands payment options for customers, increasing the chances of completing sales.</li>
			<li>Reduces merchant exposure to token price volatility.</li>
			<li>Simplifies the backend process by eliminating the need for manual swaps.</li>
			<li>
				Provides flexibility to merchants to receive payments in stablecoins or other desired
				tokens.
			</li>
		</ul>
	</Case>
</div>

<style>
	div.cases {
		width: 100%;
		padding: 70px 0;
		border-top: 1px solid rgba(170, 114, 206, 0.12);
	}

	h2 {
		margin-bottom: 20px;
		text-align: center;
	}

	h3 {
		margin-top: 10px;
	}
</style>
