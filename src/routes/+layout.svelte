<script>
	import NavBar from '$lib/components/NavBar.svelte';

	let currentYear = new Date().getFullYear();

	import Footer from '$lib/components/Footer.svelte';

</script>

<NavBar />

<main>
	<slot />
</main>

<Footer />
