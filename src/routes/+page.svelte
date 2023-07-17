<script lang="ts">
	import Inputs from '$lib/components/Inputs.svelte';
	import type { Mode } from '../lib/types';
	import Modes from '$lib/components/Modes.svelte';

	let mode: Mode = 'simple';

	const makeAdvanced = () => {
		mode = 'advanced';
	};
	const makeSimple = () => {
		mode = 'simple';
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Hyper home page" />
</svelte:head>

<section>
	<h1>HyperDTI</h1>
	<Modes {mode} {makeSimple} {makeAdvanced} />
	<Inputs {mode} />
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
		font-size: 2rem;
		margin: 0;
	}
</style>
