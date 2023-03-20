<script lang="ts">
	import { fade } from 'svelte/transition';

	/**
	 * Amount of time to show the component.
	 */
	export let duration: number;

	/**
	 * Toggle this component to show.
	 */
	export let trigger: number;

	/**
	 * Whether to show the component.
	 */
	let show: boolean = false;

	/**
	 * Cause the component to show for a set amount of time.
	 */
	$: {
		if (trigger) {
			show = true;
			setTimeout(() => {
				show = false;
			}, duration);
		}
	}
</script>

{#if show}
	<div transition:fade>
		<slot />
	</div>
{/if}

<style>
	div {
		width: 100%;
		height: 100%;
		display: flex;

		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 3rem;
	}
</style>
