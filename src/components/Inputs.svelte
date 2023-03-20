<script lang="ts">
	import { addLink } from '../services/firebase/firebase';
	import type { LinkDoc } from '../services/firebase/types';
	import Recents from './Recents.svelte';

	const enum Status {
		Idle,
		Loading,
		Success,
		Error,
		Invalid
	}

	let status: Status = Status.Idle;
	let inputVal: string = '';

	let history: LinkDoc[] = [];

	$: msg =
		status === Status.Loading
			? 'Loading...'
			: status === Status.Error
			? 'Something went wrong!'
			: status === Status.Success
			? 'Success!'
			: status === Status.Invalid
			? 'Invalid URL'
			: '';

	const handleSubmit = async () => {
		status = Status.Loading;
		addLink(inputVal)
			.then((res) => {
				status = Status.Success;
				history.push({
					url: inputVal,
					short: res
				});
				history = [...history];
				inputVal = '';
			})
			.catch((err) => {
				if (err.message === 'INVALID_LINK') {
					status = Status.Invalid;
				} else {
					status = Status.Error;
				}

				console.log(err);
			});
	};
</script>

<form class="wrapper" on:submit|preventDefault={handleSubmit}>
	<input bind:value={inputVal} type="text" placeholder="Enter a link to shorten" />
	<button type="submit">Submit</button>
</form>

<p>{msg}</p>

{#if history.length > 0}
	<Recents props={history} />
{/if}

<style>
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		gap: 1rem;
		font-family: 'Poppins', sans-serif;
	}

	input {
		display: flex;
		border: 1px solid var(--var-color-white);
		border-radius: 15px;
		margin: 1rem 0;
		padding: 0.75rem 1.25rem;
		width: clamp(10rem, 50vw, 30rem);

		overflow: hidden;
		font-family: 'Poppins', sans-serif;
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--var-color-grey);
		border: 1.5px solid var(--var-color-white);
		border-radius: 15px;
		margin: 1rem 0;
		padding: 0.75rem 1.25rem;
		background-color: var(--var-color-white);
		overflow: hidden;
		font-family: 'Poppins', sans-serif;
		transition: all 0.2s ease-in-out;
	}

	button:hover {
		border: 1.5px solid var(--var-color-white);
		background-color: var(--var-color-red);
		color: var(--var-color-white);
	}
</style>