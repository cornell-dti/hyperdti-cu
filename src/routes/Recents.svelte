<script lang="ts">
	import type { LinkDoc } from '../services/firebase/types';

	export let links: LinkDoc[];
</script>

<div class="wrapper">
	{#if links.length === 0}
		<div class="no-content">
			<p>No recent links</p>
		</div>
	{:else}
		{#each links as link}
			<div class="row">
				<p>{link.url}</p>
				<p>{link.short}</p>
			</div>
		{/each}
	{/if}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		border-radius: 15px;
		height: clamp(2rem, 25vh, 30rem);
		width: clamp(10rem, 50vw, 30rem);
		background-color: #373737;
		box-shadow: inset 0px 10px 30px -10px rgba(0, 0, 0, 0.25);
		overflow-y: scroll;
		align-items: center;
		justify-content: start;
	}

	.no-content {
		color: var(--var-color-grey);
	}

	.row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: 0.5rem 1rem;
		border-bottom: 1px solid var(--var-color-grey);
		font-size: 0.75rem;
		width: 75%;
	}

	.row p {
		width: 50%;
		overflow-x: scroll;
		overflow-y: hidden;
		white-space: nowrap;
	}
</style>
