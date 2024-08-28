<script lang="ts">
	import { getAddress } from 'viem';
	import ImageLazyLoad from './ImageLazyLoad.svelte';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import type { TokenType } from '../app';

	export let tokens: TokenType[];
	export let textToShow = 'Token to receive';

	let wrapper: HTMLDivElement;
	let picker: HTMLDivElement;
	let container: HTMLDivElement;
	let tokenInput: HTMLInputElement;

	let tokensList: TokenType[] = [];
	let selected: TokenType | null = null;
	let isOpen = false;
	let tokenInputValue: string;
	const dispatch = createEventDispatcher();

	$: {
		if (isOpen && tokenInputValue && tokenInputValue != '') {
			tokensList = tokens.filter(
				(t) =>
					t.name.toLowerCase().includes(tokenInputValue.toLowerCase()) ||
					t.symbol.toLowerCase().includes(tokenInputValue.toLowerCase()) ||
					t.id.toLowerCase().includes(tokenInputValue.toLowerCase())
			);
		} else {
			tokensList = tokens;
		}
	}

	const open = async () => {
		isOpen = true;
		setTimeout(() => {
			picker.style.height = '232px';
			picker.style.boxShadow = '0px 4px 4px 0px rgba(0, 0, 0, 0.25)';
			container.style.height = '192px';
		}, 20);

		await tick();
		tokenInput.focus();
	};

	const close = () => {
		if (!isOpen) return;
		picker.style.height = '40px';
		picker.style.boxShadow = 'none';
		container.style.height = '0px';
		setTimeout(() => {
			isOpen = false;
		}, 150);
	};

	const select = (token: TokenType) => {
		dispatch('change', token);
		selected = token;
		close();
	};

	const clickHandler = (e: MouseEvent) => {
		const target = e.target as Element;
		if (target && !wrapper.contains(target)) {
			close();
		}
	};

	const contentClicked = () => {
		if (!isOpen) {
			open();
		}
	};

	onMount(() => {
		document.addEventListener('mousedown', clickHandler);
		return () => document.removeEventListener('mousedown', clickHandler);
	});
</script>

<div class="relative" bind:this={wrapper}>
	<div class="picker" bind:this={picker}>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="content" on:click={contentClicked}>
			{#if isOpen}
				<input type="text" bind:this={tokenInput} bind:value={tokenInputValue} />
			{:else if !selected}
				{textToShow}
			{:else}
				<div class="token">
					<div>
						<ImageLazyLoad
							src={`https://tokens.pancakeswap.finance/images/${getAddress(selected.id)}.png`}
							alt={selected.name}
							root={null}
						/>
					</div>

					<p>
						{selected.name} ({selected.symbol})
					</p>
				</div>
			{/if}
		</div>

		{#if isOpen}
			<div class="line"></div>

			<div class="list" bind:this={container}>
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				{#each tokensList as token}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="token" on:click={() => select(token)}>
						<div>
							{#key token.name}
								<ImageLazyLoad
									src={`https://tokens.pancakeswap.finance/images/${getAddress(token.id)}.png`}
									alt={token.name}
									root={container}
								/>
							{/key}
						</div>

						<p>
							{token.name} ({token.symbol})
						</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	div.relative {
		width: 350px;
		height: 40px;
		position: relative;
		z-index: 50;
	}

	div.picker {
		position: absolute;
		z-index: 100;
		top: 0;
		right: 0;
		left: 0;
		height: 40px;
		background: rgb(29, 38, 59);
		border-radius: 20px;
		border: 2px solid rgba(170, 114, 206, 0.12);
		box-sizing: content-box;
		cursor: pointer;
		transition: 150ms;
		overflow: hidden;

		&:focus,
		&:hover {
			border: 2px solid rgb(170, 114, 206);

			div.line {
				background: rgb(170, 114, 206);
			}
		}
	}

	div.content {
		width: 100%;
		height: 40px;
		font-size: 14px;
		display: flex;
		align-items: center;
		padding: 7px 20px;
		box-sizing: border-box;

		& > div.token {
			margin-left: -25px;
		}

		& > input {
			width: 100%;
			height: 100%;
			border: 0;
			background: transparent;

			&:focus {
				outline: none;
				box-shadow: none;
			}
		}
	}

	div.list {
		background: rgb(29, 38, 59);
		position: relative;
		z-index: 50;
		overflow-y: auto;
	}

	div.token {
		height: 32px;
		width: 100%;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 10px;
		overflow-x: hidden;

		& > div {
			width: 32px;
			height: 32px;
		}
	}

	div.line {
		width: 100%;
		height: 2px;
		background: rgba(170, 114, 206, 0.12);
		transition: 150ms;
	}
</style>
