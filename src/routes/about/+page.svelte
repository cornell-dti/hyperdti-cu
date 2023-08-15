<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="about-column">
	<h1>About HyperDTI</h1>

	<p>
		This is a simple Hyperlink shortener and redirect hub for <a href="https://www.cornelldti.org/"
			>Cornell Digital Tech & Innovation</a
		>, built on the FKIT stack (Firebase and SvelteKit), with analytics on
		<a href="https://posthog.com/">PostHog</a>
		and deployed on <a href="https://vercel.com">Vercel</a>.
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

	p {
		text-align: center;
	}
</style>
