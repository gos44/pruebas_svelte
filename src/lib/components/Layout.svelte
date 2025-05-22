<!-- App.svelte -->
<script>
  import { mount } from 'svelte';
  
  let currentPage = '/';
  
//   function navigateTo(page) {
//     currentPage = page;
//   }


</script>

<div class="app">
  <!-- Navbar -->
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-brand">
        <h2>Mi App</h2>
      </div>
      <ul class="nav-menu">
        <li><button class="nav-link" >Inicio</button></li>


        <li><button class="nav-link" class:active={currentPage === 'Reactiviadad'} onclick={() => navigateTo('/Reactiviadad')}>Reactiviadad</button></li>

        <li><button class="nav-link" class:active={currentPage === 'Props'} onclick={() => navigateTo('/Props')}>Props</button></li>

        <li><button class="nav-link" class:active={currentPage === '7Eventos-binding'} onclick={() => navigateTo('Eventos-binding')}>Eventos-Eventos</button></li>

        <li><button class="nav-link" class:active={currentPage === '/Slots'} onclick={() => navigateTo('Slots')}>Slots</button></li>

        <li><button class="nav-link" class:active={currentPage === '/Stores'} onclick={() => navigateTo('Stores')}>Stores</button></li>
      </ul>
    </div>
  </nav>

  <!-- Contenido Principal -->
  <!-- <main class="main-content">
    {#if currentPage === 'home'}
      <section class="page">
        <h1>Bienvenido</h1>
        <p>Esta es la página principal de tu aplicación. Aquí puedes agregar el contenido que necesites.</p>
        <div class="card">
          <h3>Característica 1</h3>
          <p>Descripción de una característica importante de tu aplicación.</p>
        </div>
        <div class="card">
          <h3>Característica 2</h3>
          <p>Otra característica interesante que quieras destacar.</p>
        </div>
      </section>
    {:else if currentPage === 'about'}
      <section class="page">
        <h1>Acerca de Nosotros</h1>
        <p>Información sobre tu empresa o proyecto.</p>
        <div class="card">
          <h3>Nuestra Misión</h3>
          <p>Descripción de la misión de tu organización.</p>
        </div>
      </section>
    {:else if currentPage === 'services'}
      <section class="page">
        <h1>Nuestros Servicios</h1>
        <p>Conoce todos los servicios que ofrecemos.</p>
        <div class="services-grid">
          <div class="card">
            <h3>Servicio 1</h3>
            <p>Descripción del primer servicio.</p>
          </div>
          <div class="card">
            <h3>Servicio 2</h3>
            <p>Descripción del segundo servicio.</p>
          </div>
          <div class="card">
            <h3>Servicio 3</h3>
            <p>Descripción del tercer servicio.</p>
          </div>
        </div>
      </section>
    {:else if currentPage === 'contact'}
      <section class="page">
        <h1>Contacto</h1>
        <p>¿Tienes alguna pregunta? ¡Contáctanos!</p>
        <div class="contact-info">
          <div class="card">
            <h3>Email</h3>
            <p>contacto@miapp.com</p>
          </div>
          <div class="card">
            <h3>Teléfono</h3>
            <p>+1 234 567 8900</p>
          </div>
        </div>
      </section>
    {/if}
  </main> -->

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h4>Mi App</h4>
        <p>Una aplicación simple y elegante.</p>
      </div>
      <div class="footer-section">
        <h4>Enlaces</h4>
        <ul>
          <li><button class="footer-link" onclick={() => navigateTo('home')}>Inicio</button></li>
          <li><button class="footer-link" onclick={() => navigateTo('Stores')}>Acerca de</button></li>
          <li><button class="footer-link" onclick={() => navigateTo('Props')}>Servicios</button></li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>Contacto</h4>
        <p>contacto@miapp.com</p>
        <p>+1 234 567 8900</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 Mi App. Todos los derechos reservados.</p>
    </div>
  </footer>
</div>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
  }

  /* Navbar Styles */
  .navbar {
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
  }

  .nav-brand h2 {
    color: #2563eb;
    font-weight: bold;
  }

  .nav-menu {
    display: flex;
    list-style: none;
    gap: 30px;
  }

  .nav-link {
    background: none;
    border: none;
    color: #666;
    text-decoration: none;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .nav-link:hover {
    color: #2563eb;
    background-color: #f1f5f9;
  }

  .nav-link.active {
    color: #2563eb;
    background-color: #e0f2fe;
  }

  /* Main Content */
  .main-content {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    width: 100%;
  }

  .page {
    animation: fadeIn 0.3s ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .page h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
    color: #1e293b;
  }

  .page > p {
    font-size: 1.1em;
    color: #64748b;
    margin-bottom: 30px;
  }

  .card {
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    margin-bottom: 20px;
    border: 1px solid #e2e8f0;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }

  .card h3 {
    color: #1e293b;
    margin-bottom: 10px;
    font-size: 1.3em;
  }

  .card p {
    color: #64748b;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 30px;
  }

  .contact-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 30px;
  }

  /* Footer Styles */
  .footer {
    background-color: #1e293b;
    color: white;
    margin-top: auto;
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
  }

  .footer-section h4 {
    margin-bottom: 15px;
    color: #f1f5f9;
    font-size: 1.2em;
  }

  .footer-section p {
    color: #94a3b8;
    margin-bottom: 10px;
  }

  .footer-section ul {
    list-style: none;
  }

  .footer-section ul li {
    margin-bottom: 8px;
  }

  .footer-link {
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-link:hover {
    color: #60a5fa;
  }

  .footer-bottom {
    border-top: 1px solid #334155;
    padding: 20px;
    text-align: center;
    color: #94a3b8;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .nav-container {
      flex-direction: column;
      height: auto;
      padding: 15px 20px;
    }

    .nav-menu {
      margin-top: 15px;
      gap: 15px;
    }

    .main-content {
      padding: 20px 15px;
    }

    .page h1 {
      font-size: 2em;
    }

    .services-grid {
      grid-template-columns: 1fr;
    }

    .contact-info {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .nav-menu {
      flex-wrap: wrap;
      justify-content: center;
    }

    .card {
      padding: 20px;
    }

    .footer-container {
      grid-template-columns: 1fr;
      text-align: center;
    }
  }
</style>