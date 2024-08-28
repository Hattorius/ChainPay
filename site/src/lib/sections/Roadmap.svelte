<script lang="ts">
	let card: HTMLDivElement;

	const left = () =>
		card.scrollTo({
			left: 0,
			behavior: 'smooth'
		});

	const right = () =>
		card.scrollTo({
			left: 99999,
			behavior: 'smooth'
		});
</script>

<div class="roadmap">
	<div>
		<div class="heading">
			<div class="left">
				<h2>Roadmap</h2>
			</div>

			<div class="right">
				<button on:click={left}>
					<img src="/arrow.svg" alt="Press to move carousel to left" />
				</button>

				<button on:click={right}>
					<img
						src="/arrow.svg"
						alt="Press to move carousel to right"
						style="transform: rotate(180deg)"
					/>
				</button>
			</div>
		</div>

		<div class="card">
			<div class="card-content" bind:this={card}>
				<div class="item">
					<h3>Version 0.1</h3>

					<div class="bar">
						<div class="progress" />
						<div class="dot" style="background: #fff" />
					</div>

					<div class="content">
						<ul>
							<li>Backend APIs for developers to integrate payment creation functionality</li>
							<li>Payment support for selected tokens using specific PancakeSwap pools</li>
							<li>Accept payments to both wallets and smart contracts</li>
							<li>Basic documentation and examples for developer integration</li>
							<li>Demo widget for testing payment functionality</li>
						</ul>
					</div>
				</div>

				<div class="item">
					<h3>Version 0.2</h3>

					<div class="bar">
						<div class="dot" />
					</div>

					<div class="content">
						<ul>
							<li>Allow smart contracts to initiate and send payments</li>
							<li>Expand support for additional tokens and liquidity pools</li>
							<li>Support multi-hop swaps for more efficient token conversion</li>
							<li>Implement basic logging and transaction monitoring for payment tracking</li>
							<li>Upgrade developer documentation with code snippets and SDK examples</li>
						</ul>
					</div>
				</div>

				<div class="item">
					<h3>Version 0.3</h3>

					<div class="bar">
						<div class="dot" />
					</div>

					<div class="content">
						<ul>
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

				<div class="item">
					<h3>Version 1.0</h3>

					<div class="bar no-color">
						<div class="dot" />
					</div>

					<div class="content">
						<ul>
							<li>
								Introduce cross-chain payment support utilizing bridges for seamless multi-chain
								interactions
							</li>
							<li>
								Allow payment batching to reduce transaction costs (e.g., aggregate multiple
								payments into a single transaction)
							</li>
							<li>
								Implement customizable fee structures for projects integrating ChainPay (e.g.,
								revenue sharing or flat fees)
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
		</div>
	</div>
</div>

<style lang="scss">
	div.roadmap {
		padding: 70px;
		background: rgba(217, 217, 217, 0.03);

		& > div {
			max-width: 1015px;
			width: 100%;
			margin: 0 auto;
		}
	}

	div.heading {
		width: 100%;
		margin-bottom: 30px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.right {
			display: flex;
			gap: 14px;
		}
	}

	div.card {
		border-radius: 14px;
		background: #141a2a;

		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		padding: 40px;

		div.card-content {
			display: flex;
			overflow-x: hidden;
		}
	}

	button {
		padding: 0;
		border: 0;
		width: 36px;
		height: 36px;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		position: relative;
		background: #141a2a;
		border-radius: 14px;

		& > img {
			position: absolute;
			top: 13px;
			left: 13px;
		}
	}

	div.item {
		min-width: 325px;

		.bar {
			margin-top: 20px;
			margin-bottom: 35px;
			width: 100%;
			height: 6px;
			background: #aa72ce;
			position: relative;

			&.no-color {
				background: transparent;
			}

			.dot {
				position: absolute;
				width: 12px;
				height: 12px;
				top: -3px;
				left: 0;
				background: #aa72ce;
				border-radius: 6px;
			}

			.progress {
				position: absolute;
				background: #fff;
				border-radius: 3px;
				height: 6px;
				width: 60px;
				left: 0;
				top: 0;
			}
		}

		.content {
			padding-right: 20px;

			&:last-child {
				padding-right: 0;
				width: 305px;
			}
		}
	}

	@media screen and (max-width: 869px) {
		div.heading > .right {
			display: none;
		}

		.card-content {
			overflow-x: scroll !important;
		}
	}

	@media screen and (max-width: 535px) {
		div.roadmap {
			padding: 20px;
		}
	}

	@media screen and (max-width: 430px) {
		div.roadmap > div > div.card {
			padding: 15px;
		}
	}
</style>
