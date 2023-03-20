<script lang="ts">
	import { goto } from '$app/navigation';
	export let data;
	import loadingPic from '$lib/images/dtilogo-circle.png';
	import { sleep } from '$lib/util';

	// on mount, we wait 1.5 seconds, then redirect to the link
	import { onMount } from 'svelte';
	import { getLinkFromShort } from '../../../stores/firebase/firebase';

	onMount(async () => {
		getLinkFromShort(data.short)
			.then(async (link) => {
				window.location.href = link;
			})
			.catch(async (err) => {
				console.log(err);
				goto('/404');
			});
	});
</script>

<svelte:head>
	<title>Redirecting...</title>
	<meta name="description" content="Redirecting..." />
</svelte:head>

<div class="body">
	<img src={loadingPic} alt="Redirecting..." width="140px" />
	<h1>Redirecting...</h1>
</div>

<style>
	.body {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		background-color: #373738;

		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	h1 {
		font-size: 4rem;
	}
</style>
