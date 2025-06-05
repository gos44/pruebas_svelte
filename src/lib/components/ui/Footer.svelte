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
					<li><a href="/formulario">Formulario</a></li>
					<li><a href="/login">Login</a></li>
					<li><a href="/metricas">Métricas</a></li>
					<li><a href="/tareas">Tareas</a></li>
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
				background-color: #374151;
				color: #d1d5db;
				padding: 2rem 0 1rem;
				margin-top: auto;
			}

			.footer-container {
				max-width: 1200px;
				margin: 0 auto;
				padding: 0 1rem;
			}

			.footer-content {
				display: grid;
				grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
				gap: 2rem;
				margin-bottom: 1rem;
			}

			.footer-section h3 {
				color: #fff;
				margin-bottom: 1rem;
				font-size: 1.1rem;
			}

			.footer-section ul {
				list-style: none;
				padding: 0;
			}

			.footer-section ul li {
				margin-bottom: 0.5rem;
			}

			.footer-section a {
				color: #d1d5db;
				text-decoration: none;
				transition: color 0.3s ease;
			}

			.footer-section a:hover {
				color: #fff;
			}

			.footer-bottom {
				border-top: 1px solid #4b5563;
				padding-top: 1rem;
				text-align: center;
				color: #9ca3af;
				font-size: 0.9rem;
				margin-top: 1rem;
			}

			/* Responsive */
			@media (max-width: 768px) {
				.footer-content {
					grid-template-columns: 1fr;
					text-align: center;
				}
			}
		</style>
