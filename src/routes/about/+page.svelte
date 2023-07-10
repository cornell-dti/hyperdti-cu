<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="about-column">
	<h1>About HyperDTI</h1>

	<p>
		This is a simple Hyperlink shortener and redirect hub for the <a
			href="https://www.cornelldti.org/">Cornell Design and Tech Initiative</a
		>. Analytics are managed on <a href="https://posthog.com/">PostHog</a>. Technologies are built
		on the FKIT stack (Firebase, TypeScript, SvelteKit, Vite). It is deployed on
		<a href="https://vercel.com">Vercel</a>.
	</p>

	<p>
		Created by <a href="https://danielwei.me/">Daniel Wei</a>.
	</p>
</div>

<style>
	.about-column {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: clamp(300px, 50%, 600px);
	}
</style>
