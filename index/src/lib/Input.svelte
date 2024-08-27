<input type="text" {...$$props} />

<style>
	input {
		background: transparent;
		border-radius: 20px;
		border: 2px solid rgba(170, 114, 206, 0.12);
		width: 350px;
		height: 44px;
		padding: 7px 20px;
		box-sizing: border-box;
		transition: 150ms;
		color: #fff;

		&:focus {
			outline: none;
			box-shadow: none;
		}

		&:focus,
		&:hover {
			border: 2px solid rgb(170, 114, 206);
		}

		&::placeholder {
			color: #fff;
		}
	}
</style>
