<script lang="ts">
	import Recents from '../../components/Recents.svelte';
	import { onMount } from 'svelte';
	import type { LinkDoc } from '../../services/firebase/types';
	import { getAllLinks } from '../../services/firebase/firebase';

	// links to display
	let links: LinkDoc[] = [];

	// on mount, we want to get all the links
	onMount(async () => {
		links = await getAllLinks();
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Hyper home page" />
</svelte:head>

<section>
	<h1>All Links</h1>
	{#if links.length === 0}
		<p>Loading...</p>
	{:else}
		<Recents props={links} />
	{/if}
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
		text-align: center;
		font-size: 1.5rem;
		margin: 1.5rem;
	}
</style>
