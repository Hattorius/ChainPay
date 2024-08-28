<div>
	<slot />
</div>

<style>
	:global(h1) {
		font-size: 50px;
		font-weight: 300;
		line-height: 64px;
	}

	:global(subtitle) {
		font-size: 16px;
		font-weight: 300;
		line-height: 26px;
		margin-top: 20px;
	}

	:global(button) {
		background: transparent;
		border: 2px solid #aa72ce;
		border-radius: 20px;
		padding: 19px 29px;

		font-size: 14px;
		font-weight: 700;

		cursor: pointer;
		text-transform: uppercase;
	}

	:global(h2) {
		font-size: 36px;
		font-weight: 600;
		line-height: 48px;
	}

	:global(h3) {
		font-size: 20px;
		font-weight: 500;
		line-height: 30px;
	}

	:global(p) {
		font-size: 16px;
		font-weight: 400;
		line-height: 26px;
	}

	:global(button.secondary) {
		background: transparent;
		border: 2px solid #aa72ce;
		border-radius: 20px;
		padding: 13px 26px;

		font-size: 16px;
		font-weight: 500;

		cursor: pointer;
		text-transform: uppercase;
	}

	:global(ul) {
		padding-left: 17px;
	}

	:global(li) {
		line-height: 26px;

		&::marker {
			color: #aa72ce;
		}
	}

	:global(body) {
		margin: 0;
		background: #141a2a;
		min-height: 100vh;
	}

	:global(*) {
		font-family: 'Mulish', sans-serif;
		color: #fff;
		margin: 0;
	}
</style>
