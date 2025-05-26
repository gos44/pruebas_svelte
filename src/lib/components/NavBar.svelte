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
	.active {
		color: #2563eb !important;
		font-weight: 600;
	}
	.nav-links a {
		position: relative;
	}
	.nav-links a.active::after {
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
