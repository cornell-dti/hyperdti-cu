<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="about-column">
	<h1>About HyperDTI</h1>

	<p>
		This is a simple Hyperlink shortener and redirect hub for the <a
			href="https://www.cornelldti.org/">Cornell Design and Tech Initiative</a
		>. It is built using <a href="https://svelte.dev">Svelte</a> and
		<a href="https://svelte.dev">SvelteKit</a>, as well as
		<a href="https://firebase.google.com">Firebase</a> for Firebase Functions and Cloud Firestore.
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
