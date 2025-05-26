<!-- src/lib/components/Footer.svelte -->
<script>
	let currentYear = new Date().getFullYear();
</script>

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
					<li><a href="/Binding">Binding</a></li>
					<li><a href="/Reactividad">Reactividad</a></li>
					<li><a href="/Slots">Slots</a></li>
					<li><a href="/Props">Props</a></li>
					<li><a href="/Store">Store</a></li>
					<li><a href="/Extra">Extra</a></li>
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
	.footer {
		background-color: --color-primary-teal;
		padding: 2rem 1rem;
		margin-top: 2rem;
	}

	.footer-container {
		max-width: 1200px;
		margin: auto;
	}

	.footer-content {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		justify-content: space-between;
	}

	.footer-section h3 {
		margin-bottom: 0.5rem;
	}

	.footer-section ul {
		list-style: none;
		padding: 0;
	}

	.footer-section ul li {
		margin-bottom: 0.3rem;
	}

	.footer-bottom {
		margin-top: 1rem;
		text-align: center;
		color: #555;
		font-size: 0.9rem;
	}
</style>
