<script>
import { page } from '$app/stores';
import NavBar from '$lib/components/NavBar.svelte';
import Footer from '$lib/components/Footer.svelte';
</script>

<nav>
	<a href="/">Default</a>
	<a href="/en">english</a>
	<a href="/de">german</a>
	<a href="/fr">french</a>
</nav>


{#if $page.url.pathname !== '/sobre-Componentes'}
<NavBar />
{/if}

<slot />

{#if $page.url.pathname !== '/sobre-Componentes'}
<Footer />
{/if}

