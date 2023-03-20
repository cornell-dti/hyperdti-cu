<script>
	import Inputs from '../components/Inputs.svelte';

	const title = 'Hyper';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Hyper home page" />
</svelte:head>

<section>
	<h1>Welcome to {title}</h1>
	<p>The Design and Tech Initiative <b>@</b> Cornell University</p>
	<Inputs />
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
