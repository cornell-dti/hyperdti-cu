<script lang="ts">
	import { getDomain, pathToUrl } from '$lib/util';
	import type { LinkDoc } from '$lib/firebase/types';
	import copy from '$lib/assets/copy.png';

	export let props: LinkDoc[];

	$: links = props.map(({ url, short }) => ({
		longUrl: url,
		shortUrl: pathToUrl(short, getDomain(window.location.href)),
		short: short
	}));
</script>

<div class="wrapper">
	{#if links.length === 0}
		<div class="no-content">
			<p>No links yet.</p>
		</div>
	{:else}
		{#each links as { longUrl, shortUrl, short }}
			<div class="row">
				<p class="left"><a href={longUrl}>{longUrl}</a></p>
				<p class="right"><a href={shortUrl}>{getDomain(shortUrl) + '/' + short}</a></p>
				<p
					class="icon-wrapper"
					on:click|preventDefault={() => navigator.clipboard.writeText(shortUrl)}
					on:keypress|preventDefault={() => console.log('Keypress Logged!')}
				>
					<img class="icon" src={copy} alt="copy" />
				</p>
			</div>
		{/each}
	{/if}
</div>

<style>
	div.wrapper {
		display: flex;
		flex-direction: column-reverse;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: no-wrap;

		border-radius: var(--var-border-radius);
		height: clamp(10rem, fit-content, 30rem);
		width: clamp(10rem, 50vw, 30rem);

		background-color: #373737;
		box-shadow: inset 0px 10px 30px -10px rgba(0, 0, 0, 0.35);

		overflow: scroll;

		margin-top: 2rem;
	}

	@media (max-width: 768px) {
		div.wrapper {
			width: calc(100vw - 1.5rem);
		}
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
		overflow-x: scroll;
		overflow-y: hidden;
		white-space: nowrap;
	}

	/* Hide scrollbar for Chrome, Safari and Opera */
	.row p::-webkit-scrollbar {
		display: none;
	}

	/* Hide scrollbar for IE, Edge and Firefox */
	.row p {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	.left {
		width: 45%;
	}

	.right {
		width: 45%;
	}

	.icon-wrapper {
		width: 10%;
		cursor: pointer;
	}

	.icon {
		height: 20px;
		width: 20px;
		transform: translate(0, 2px);
	}
</style>
