<script lang="ts">
	import type { Mode } from '$lib/types';

	export let mode: Mode;
	export let makeSimple: () => void;
	export let makeAdvanced: () => void;
</script>

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

<style>
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
