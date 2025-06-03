<script>
	import TarjetaUsuario from '$lib/components/TarjetaUsuario.svelte';

	let currentYear = new Date().getFullYear();
	const usuarios = [
        { nombre: 'Ana', edad: 28 },
        { nombre: 'Luis', edad: 35 },
        { nombre: 'María', edad: 22 }
    ];
</script>


<svelte:head>
	<title>Inicio - Mi Sitio</title>
	<meta name="description" content="Página de inicio de mi sitio web" />
</svelte:head>

<div class="hero">
	<h1>Bienvenido a Mi Sitio</h1>
	<p>Una descripción breve de lo que ofreces o haces.</p>
	<div class="hero-buttons">
		<button class="btn-primary">Comenzar</button>
		<button class="btn-secondary">Saber Más</button>
	</div>
</div>

<section class="features">
    <h2>Nuestros Usuarios</h2>
    <div class="features-grid">
        {#each usuarios as usuario}
            <TarjetaUsuario {usuario} />
        {/each}
    </div>
</section>

<style>
	.hero {
		text-align: center;
		padding: 4rem 0;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border-radius: 12px;
		margin-bottom: 3rem;
	}
	
	.hero h1 {
		font-size: 3rem;
		margin-bottom: 1rem;
		font-weight: 700;
	}
	
	.hero p {
		font-size: 1.2rem;
		margin-bottom: 2rem;
		opacity: 0.9;
	}
	
	.hero-buttons {
		display: flex;
		gap: 1rem;
		justify-content: center;
		flex-wrap: wrap;
	}
	
	.btn-primary, .btn-secondary {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s ease;
	}
	
	.btn-primary {
		background-color: white;
		color: #667eea;
	}
	
	.btn-primary:hover {
		background-color: #f8f9fa;
		transform: translateY(-2px);
	}
	
	.btn-secondary {
		background-color: transparent;
		color: white;
		border: 2px solid white;
	}
	
	.btn-secondary:hover {
		background-color: white;
		color: #667eea;
		transform: translateY(-2px);
	}
	
	.features {
		margin: 3rem 0;
	}
	
	.features h2 {
		text-align: center;
		font-size: 2.5rem;
		margin-bottom: 2rem;
		color: #1f2937;
	}
	
	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 2rem;
		margin-top: 2rem;
	}
	
	.feature-card {
		background: white;
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}
	
	.feature-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
	}
	
	.feature-card h3 {
		color: #2563eb;
		margin-bottom: 1rem;
		font-size: 1.3rem;
	}
	
	.feature-card p {
		color: #6b7280;
		line-height: 1.6;
	}
	
	/* Responsivo */
	@media (max-width: 768px) {
		.hero h1 {
			font-size: 2rem;
		}
		
		.hero p {
			font-size: 1rem;
		}
		
		.hero-buttons {
			flex-direction: column;
			align-items: center;
		}
		
		.btn-primary, .btn-secondary {
			width: 200px;
		}
		
		.features h2 {
			font-size: 2rem;
		}
		
		.features-grid {
			grid-template-columns: 1fr;
		}
	}
</style>