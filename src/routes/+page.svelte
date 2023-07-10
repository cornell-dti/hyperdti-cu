<script lang="ts">
	import Inputs from '../components/Inputs.svelte';
	import logo from '$lib/images/hyperdtilogo.png';
	import type { Mode } from '../types/mode';

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
	<div class="tabrow">
		<div
			class={'tab ' + (mode === 'simple' ? ' activetab' : 'tab')}
			on:click={makeSimple}
			on:keypress={makeSimple}
		>
			Simple
		</div>
		<div
			class={'tab ' + (mode === 'advanced' ? ' activetab' : 'tab')}
			on:click={makeAdvanced}
			on:keypress={makeAdvanced}
		>
			Advanced
		</div>
	</div>
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

	div.tabrow {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		margin-top: 2rem;
	}

	div.tab {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		border-radius: 0;
		border-bottom: 2px solid var(--var-color-grey);
		background-color: var(--var-color-blue);
		color: var(--var-color-white);
		cursor: pointer;
		transition: var(--var-std-transition);
	}

	div.activetab,
	div.tab:hover {
		border-bottom: 2px solid var(--var-color-red);
	}
</style>
