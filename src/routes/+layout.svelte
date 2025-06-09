<script>
import { page } from '$app/stores';
import NavBar from '$lib/components/ui/NavBar.svelte';
import Footer from '$lib/components/ui/Footer.svelte';
</script>

{#if $page.url.pathname !== '/sobre-Componentes' && $page.url.pathname !== '/canvas'}
<NavBar />
{/if}

<slot />

{#if $page.url.pathname !== '/sobre-Componentes'&& $page.url.pathname !== '/canvas'}
<Footer />
{/if}