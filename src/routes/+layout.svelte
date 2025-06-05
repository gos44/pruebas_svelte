<script>
import { page } from '$app/stores';
import NavBar from '$lib/components/ui/NavBar.svelte';
import Footer from '$lib/components/ui/Footer.svelte';
</script>

{#if $page.url.pathname !== '/sobre-Componentes'}
<NavBar />
{/if}

<slot />

{#if $page.url.pathname !== '/sobre-Componentes'}
<Footer />
{/if}