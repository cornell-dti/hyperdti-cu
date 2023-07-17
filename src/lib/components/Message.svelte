<script lang="ts">
	import { Status } from '$lib/types';
	import Temporary from './Temporary.svelte';

	export let status: Status;

	$: msg =
		status === Status.Loading
			? 'Loading...'
			: status === Status.Error
			? 'Something went wrong!'
			: status === Status.Success
			? 'Copied to Clipboard!'
			: status === Status.Invalid
			? 'Invalid URL'
			: status === Status.CustomShortExists
			? 'Someone already took that URL!'
			: status === Status.CustomShortIsSomethingElse
			? 'That URL is already aliased to something else!'
			: '';
</script>

<Temporary duration={5000} trigger={status}>
	<div class="alert"><p>{msg}</p></div>
</Temporary>

<style>
	div {
		position: absolute;
		bottom: 1.5rem;
		left: 1.5rem;
		width: fit-content;
		padding: 0.25rem 1.25rem;
		background-color: var(--var-color-red);
		border-radius: var(--var-border-radius);
		font-size: 0.75rem;
		box-shadow: 0px 10px 35px 5px rgba(0, 0, 0, 0.25);
	}
</style>
