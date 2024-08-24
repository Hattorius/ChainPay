<script lang="ts">
	import getHeadingsAndSubheadings from "$lib/scripts/getHeadingsAndSubheadings";

	let content: HTMLDivElement;
	$: headers = content && getHeadingsAndSubheadings(content);
</script>

<div class="pt-16 h-screen flex flex-col gap-10">
	<h1 class="text-5xl text-center">ChainPay</h1>

	<div class="flex-1">
		<div class="max-w-screen-lg w-full mx-auto flex gap-4">
			<div>
                {#if headers}
                    {#each headers as header}
                        <p class="text-lg pb-0.5">{header.h2}</p>
                        {#each header.h3 as subHeader}
                            <p class="pl-4">{subHeader}</p>
                        {/each}
                    {/each}
                {/if}
			</div>

			<div class="flex-1" bind:this={content}>
				<h2 class="text-3xl">Introduction</h2>
				<h3 class="text-xl">About</h3>

				<h2 class="text-3xl">Example</h2>
			</div>
		</div>
	</div>
</div>
