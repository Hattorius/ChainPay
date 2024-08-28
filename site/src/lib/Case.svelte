<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let title;

	let open = false;

	let caseDiv: HTMLDivElement;
	let contentDiv: HTMLDivElement;
	let line: HTMLImageElement;
	const dispatch = createEventDispatcher();

	const toggle = () => {
		if (open) {
			open = false;
			caseDiv.style.height = '30px';
			line.style.transform = 'rotate(90deg)';
		} else {
			open = true;
			caseDiv.style.height = `${contentDiv.clientHeight + 30}px`;
			line.style.transform = 'rotate(180deg)';
			dispatch('open');
		}
	};
</script>

<div class="case" bind:this={caseDiv}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="heading" on:click={toggle}>
		<h3>
			{title}
		</h3>

		<button>
			<img src="/line.svg" alt="Line making a plus" />
			<img
				src="/line.svg"
				alt="Line making a plus"
				style="transform: rotate(90deg)"
				bind:this={line}
			/>
		</button>

		<div class="bottom" />
	</div>

	<div class="content" bind:this={contentDiv}>
		<slot />
	</div>
</div>

<style lang="scss">
	div.case {
		max-width: 525px;
		height: 30px;
		width: 100%;
		margin: 0 auto;
		border-radius: 20px;
		background: #1d263b;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		padding: 25px 20px;
		overflow: hidden;
		transition: 150ms;

		&:not(:last-child) {
			margin-bottom: 20px;
		}
	}

	div.heading {
		width: 100%;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: relative;
		cursor: pointer;

		& > .bottom {
			background: rgba(170, 114, 206, 0.12);
			height: 1px;
			position: absolute;
			bottom: -26px;
			right: 0;
			left: 0;
		}
	}

	button {
		width: 40px;
		height: 40px;
		display: flex;
		position: relative;
		padding: 0;
		border-radius: 14px;

		& > img {
			position: absolute;
			width: 16px;
			height: 16px;
			top: 10px;
			left: 10px;
		}
	}

	div.content {
		padding-top: 30px;
	}

	img {
		transition: 150ms;
	}

	@media screen and (max-width: 600px) {
		div.case {
			width: calc(100% - 5rem);
		}
	}
</style>
