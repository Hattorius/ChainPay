<div class="features">
	<div class="wrapper">
		<h2>Key Features</h2>
	</div>

	<div>
		<slot />
	</div>
</div>

<style lang="scss">
	div.features {
		background: #1d263b;
		padding: 70px 0;
		width: 100%;

		div.wrapper {
			max-width: 1400px;
			width: 100%;
			margin: 0 auto;
		}

		& > div:not(.wrapper) {
			max-width: 1400px;
			width: 100%;
			margin: 40px auto 0 auto;
			border-radius: 20px;
			border: 2px solid rgba(170, 114, 206, 0.12);

			display: flex;
			justify-content: space-evenly;

			:global(div:nth-child(odd)) {
				width: 250px;
				text-align: center;
				padding: 20px 0;
			}

			:global(div:nth-child(even)) {
				background: rgba(170, 114, 206, 0.12);
				width: 2px;
				height: 100%;
			}
		}
	}

	@media screen and (max-width: 1460px) {
		div.features > div {
			width: calc(100% - 2rem) !important;
		}
	}

	@media screen and (max-width: 1120px) {
		div.features > div:not(.wrapper) {
			flex-wrap: wrap;
			justify-content: space-evenly;
			align-items: center;
		}

		:global(div.features > div:not(.wrapper) > div:nth-child(even)) {
			display: none;
		}
	}

	@media screen and (max-width: 430px) {
		div.features {
			padding-top: 40px;
			padding-bottom: 40px;
		}
	}
</style>
