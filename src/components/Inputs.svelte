<script lang="ts">
	import { Status } from '$lib/types';
	import { getDomain, pathToUrl } from '$lib/util';
	import { addLink } from '../services/firebase/firebase';
	import type { LinkDoc } from '../services/firebase/types';
	import type { Mode } from '../types/mode';
	import Message from './Message.svelte';
	import Recents from './Recents.svelte';

	export let mode: Mode;

	let status: Status = Status.Idle;

	let linkInput: string = '';
	let customShortInput: string | undefined = undefined;

	$: customShortInput = mode === 'advanced' ? customShortInput : undefined;

	let history: LinkDoc[] = [];

	const handleSubmit = async () => {
		status = Status.Loading;
		addLink(linkInput, customShortInput)
			.then((res) => {
				status = Status.Success;
				history.push({
					url: linkInput,
					short: res
				});
				history = [...history];
				navigator.clipboard.writeText(pathToUrl(res, getDomain(window.location.href)));
				linkInput = '';
			})
			.catch((err) => {
				if (err.message === 'INVALID_LINK') {
					status = Status.Invalid;
				} else if (err.message === 'CUSTOM_SHORT_EXISTS') {
					status = Status.CustomShortExists;
				} else if (err.message === 'ALREADY_ALIASED') {
					status = Status.CustomShortIsSomethingElse;
				} else {
					status = Status.Error;
				}

				console.log(err);
			});
	};
</script>

{#if mode === 'simple'}
	<form class="simple-wrapper" on:submit|preventDefault={handleSubmit}>
		<input bind:value={linkInput} type="text" placeholder="Enter a link to shorten" />
		<button type="submit">Submit</button>
	</form>
{/if}
{#if mode === 'advanced'}
	<form class="advanced-wrapper" on:submit|preventDefault={handleSubmit}>
		<input
			class="smaller-input"
			bind:value={linkInput}
			type="text"
			placeholder="Enter a link to shorten (eg. https://mitski.com)"
		/>
		<input
			class="smallest-input"
			bind:value={customShortInput}
			type="text"
			placeholder="Custom Alias (eg. mitski)"
		/>
		<button type="submit">Submit</button>
	</form>
{/if}

<Message {status} />

{#if history.length > 0}
	<Recents props={history} />
{/if}

<style>
	.simple-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		gap: 1rem;
		font-family: 'Poppins', sans-serif;
	}

	.advanced-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		font-family: 'Poppins', sans-serif;
		column-gap: 1rem;
		flex-wrap: wrap;
	}

	input {
		display: flex;
		border: 1px solid var(--var-color-white);
		border-radius: 15px;
		margin: 0.5rem 0;
		padding: 0.75rem 1.25rem;
		width: clamp(10rem, 50vw, 30rem);

		overflow: hidden;
		font-family: 'Poppins', sans-serif;
	}

	input.smallest-input {
		width: clamp(5rem, 50vw, 15rem);
	}

	input.smaller-input {
		width: clamp(10rem, 50vw, 25rem);
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		color: var(--var-color-grey);
		border: 1.5px solid var(--var-color-white);
		border-radius: var(--var-border-radius);
		margin: 1rem 0;
		padding: 0.75rem 1.25rem;
		background-color: var(--var-color-white);
		overflow: hidden;
		font-family: 'Poppins', sans-serif;
		transition: var(--var-std-transition);
		cursor: pointer;
	}

	button:hover {
		border: 1.5px solid var(--var-color-white);
		background-color: var(--var-color-red);
		color: var(--var-color-white);
	}
</style>
