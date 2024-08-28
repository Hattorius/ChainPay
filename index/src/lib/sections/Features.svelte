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
			height: 170px;

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
</style>
