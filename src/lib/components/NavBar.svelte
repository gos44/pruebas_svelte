<!-- src/lib/components/NavBar.svelte -->
<script>
	import { page } from '$app/stores';

	const enlaces = [
		{ href: '/', label: 'Inicio' },
		{ href: '/Binding', label: 'Binding' },
		{ href: '/Reactividad', label: 'Reactividad' },
		{ href: '/Slots', label: 'Slots' },
		{ href: '/Store', label: 'Store' },
		{ href: '/Props', label: 'Props' },
		{ href: '/Extra', label: 'Extra' }
	];
</script>

<nav class="navbar">
	<div class="nav-container">
		<a href="/" class="logo">Mi Sitio</a>
		<ul class="nav-links">
			{#each enlaces as { href, label }}
				<li>
					<a href="{href}" class:active={$page.url.pathname === href}>{label}</a>
				</li>
			{/each}
		</ul>
	</div>
</nav>

<style>
.navbar {
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2563eb;
    text-decoration: none;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
    margin: 0;
    padding: 0;
}

.nav-links a {
    text-decoration: none;
    color: #4b5563;
    font-weight: 500;
    transition: color 0.3s ease;
    position: relative;
}

.nav-links a:hover {
    color: #2563eb;
}

.nav-links a.active,
.nav-links a[class~="active"] {
    color: #2563eb !important;
    font-weight: 600;
}

.nav-links a.active::after,
.nav-links a[class~="active"]::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #2563eb;
    border-radius: 1px;
}
</style>