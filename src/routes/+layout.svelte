<script>
import { page } from '$app/stores';
import NavBar from '$lib/components/NavBar.svelte';
import Footer from '$lib/components/Footer.svelte';
</script>

{#if $page.url.pathname !== '/sobre-Componentes'}
<NavBar />
{/if}

<slot />

{#if $page.url.pathname !== '/sobre-Componentes'}
<Footer />
{/if}