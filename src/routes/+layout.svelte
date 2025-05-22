<script>
	import { page } from '$app/stores';
	
	// Puedes agregar lógica aquí si necesitas
	let currentYear = new Date().getFullYear();
</script>

<!-- Navbar -->
<nav class="navbar">
	<div class="nav-container">
		<a href="/" class="logo">Mi Sitio</a>
		<ul class="nav-links">
			<li><a href="/" class:active={$page.url.pathname === '/'}>Inicio</a></li>
			<li><a href="/about" class:active={$page.url.pathname === '/about'}>Acerca</a></li>
			<li><a href="/services" class:active={$page.url.pathname === '/services'}>Servicios</a></li>
			<li><a href="/contact" class:active={$page.url.pathname === '/contact'}>Contacto</a></li>
		</ul>
	</div>
</nav>

<!-- Contenido principal -->
<main>
	<slot />
</main>

<!-- Footer -->
<footer class="footer">
	<div class="footer-container">
		<div class="footer-content">
			<div class="footer-section">
				<h3>Mi Sitio</h3>
				<p>Descripción breve de tu sitio web o empresa.</p>
			</div>
			
			<div class="footer-section">
				<h3>Enlaces Rápidos</h3>
				<ul>
					<li><a href="/">Inicio</a></li>
					<li><a href="/about">Acerca</a></li>
					<li><a href="/services">Servicios</a></li>
					<li><a href="/contact">Contacto</a></li>
                    
				</ul>
			</div>
			
			<div class="footer-section">
				<h3>Contacto</h3>
				<ul>
					<li>Email: info@ejemplo.com</li>
					<li>Teléfono: +34 123 456 789</li>
					<li>Dirección: Tu dirección aquí</li>
				</ul>
			</div>
			
			<div class="footer-section">
				<h3>Síguenos</h3>
				<ul>
					<li><a href="#">Facebook</a></li>
					<li><a href="#">Twitter</a></li>
					<li><a href="#">Instagram</a></li>
					<li><a href="#">LinkedIn</a></li>
				</ul>
			</div>
		</div>
		
		<div class="footer-bottom">
			<p>&copy; {currentYear} Mi Sitio. Todos los derechos reservados.</p>
		</div>
	</div>
</footer>

<style>
	/* Estilos específicos del componente */
	.active {
		color: #2563eb !important;
		font-weight: 600;
	}
	
	/* Animaciones suaves */
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