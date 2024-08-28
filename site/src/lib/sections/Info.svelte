<div class="info">
	<div>
		<slot />
	</div>
</div>

<style lang="scss">
	div.info {
		max-width: 560px;
		text-align: center;
		margin: 0 auto;
		padding: 70px 0;
		width: 100%;

		& > div {
			padding: 0 1rem;
		}
	}
</style>
