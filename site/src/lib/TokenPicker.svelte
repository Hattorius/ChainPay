<script lang="ts">
	import { getAddress } from 'viem';
	import ImageLazyLoad from './ImageLazyLoad.svelte';
	import { createEventDispatcher, onMount, tick } from 'svelte';
	import type { TokenType } from '../app';

	export let tokens: TokenType[];
	let wrapper: HTMLDivElement;
	let tokensList: TokenType[] = [];
	let selected: TokenType | null = null;
	let container: HTMLDivElement;
	let isOpen = false;
	let tokenInput: HTMLInputElement;
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
		await tick();
		tokenInput.focus();
	};

	const close = () => {
		isOpen = false;
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

	onMount(() => {
		document.addEventListener('mousedown', clickHandler);
		return () => document.removeEventListener('mousedown', clickHandler);
	});
</script>

<div class="border cursor-pointer relative" bind:this={wrapper}>
	{#if isOpen}
		<input
			type="text"
			class="border-none bg-black w-full text-base p-2 focus:outline-none focus:border-none focus:rounded-none"
			bind:this={tokenInput}
			bind:value={tokenInputValue}
		/>
	{:else if !selected}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="p-2" on:click={open}>Press here</div>
	{:else if selected}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="p-2 flex gap-2" on:click={open}>
			<div class="h-6 w-6">
				<ImageLazyLoad
					src={`https://tokens.pancakeswap.finance/images/${getAddress(selected.id)}.png`}
					alt={selected.name}
					root={null}
				/>
			</div>

			<p class="flex-1">
				{selected.name} ({selected.symbol})
			</p>
		</div>
	{/if}

	{#if isOpen}
		<div
			class="absolute -inset-x-px top-full py-1 bg-black border max-h-48 overflow-auto overflow-x-clip"
			bind:this={container}
		>
			{#each tokensList as token}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div
					class="flex items-center gap-2 py-1 px-2 hover:bg-gray-900 transition"
					on:click={() => select(token)}
				>
					<div class="w-8 h-8">
						{#key token.name}
							<ImageLazyLoad
								src={`https://tokens.pancakeswap.finance/images/${getAddress(token.id)}.png`}
								alt={token.name}
								root={container}
							/>
						{/key}
					</div>

					<p class="flex-1">
						{token.name} ({token.symbol})
					</p>
				</div>
			{/each}
		</div>
	{/if}
</div>
