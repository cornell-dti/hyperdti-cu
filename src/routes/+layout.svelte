<script>
	import Analytics from '../components/Analytics.svelte';
	import Footer from '../components/Footer.svelte';
	import Header from '../components/Header.svelte';
	import './styles.css';
</script>

<Analytics />

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
