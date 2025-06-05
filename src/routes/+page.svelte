<script>
  // Contador interactivo
  let count = $state(0);
  function increment() {
    count += 1;
  }
  function decrement() {
    count -= 1;
  }
  // Entrada de texto reactiva
  let text = $state("¡Escribe algo!");
  // Elemento con visibilidad alternable
  let visible = $state(true);
  function toggleVisibility() {
    visible = !visible;
  }
</script>

<main>
  <div class="header">
    <h1>Bienvenido a Svelte 5</h1>
    <p class="subtitle">Experimenta con la reactividad moderna</p>
  </div>

  <div class="container">
    <section class="card counter-card">
      <div class="card-header">
        <h2>🔢 Contador Simple</h2>
      </div>
      <div class="counter-display">
        <div class="count-value">{count}</div>
      </div>
      <div class="button-group">
        <button class="btn btn-primary" onclick={decrement}>
          <span>−</span>
        </button>
        <button class="btn btn-primary" onclick={increment}>
          <span>+</span>
        </button>
      </div>
    </section>

    <section class="card">
      <div class="card-header">
        <h2>✍️ Entrada de Texto Reactiva</h2>
      </div>
      <div class="input-group">
        <input
          bind:value={text} 
          placeholder="Escribe algo aquí..."
          class="text-input"
        />
        <div class="text-preview">
          <span class="preview-label">Vista previa:</span>
          <span class="preview-text">{text}</span>
        </div>
      </div>
    </section>

    <section class="card">
      <div class="card-header">
        <h2>👁️ Alternar Visibilidad</h2>
      </div>
      <button class="btn btn-secondary toggle-btn" onclick={toggleVisibility}>
        {visible ? "✗ Ocultar" : "👁 Mostrar"} Elemento
      </button>

      {#if visible}
        <div class="reveal-box">
          <div class="reveal-content">
            <h3>¡Elemento Visible!</h3>
            <p>Esta caja aparece y desaparece mágicamente ✨</p>
          </div>
        </div>
      {/if}
    </section>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  main {
    min-height: 100vh;
    padding: 2rem 1rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  .header {
    text-align: center;
    margin-bottom: 3rem;
    animation: fadeInDown 0.8s ease-out;
  }

  h1 {
    font-size: 3rem;
    font-weight: 700;
    color: white;
    margin: 0;
    text-shadow: 0 4px 8px rgba(0,0,0,0.3);
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: gradientShift 3s ease infinite;
  }

  .subtitle {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.9);
    margin-top: 0.5rem;
    font-weight: 300;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    display: grid;
    gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    animation: fadeInUp 0.8s ease-out;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0,0,0,0.15);
  }

  .counter-card {
    text-align: center;
  }

  .card-header {
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
    color: #2d3748;
    margin: 0;
    font-weight: 600;
  }

  .counter-display {
    margin: 2rem 0;
  }

  .count-value {
    font-size: 4rem;
    font-weight: 700;
    color: #667eea;
    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  }

  .count-value:hover {
    transform: scale(1.1);
  }

  .button-group {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 50px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  }

  .btn:active {
    transform: translateY(0);
  }

  .btn-primary {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
  }

  .btn-primary:hover {
    background: linear-gradient(45deg, #5a67d8, #6b46c1);
  }

  .btn-secondary {
    background: linear-gradient(45deg, #4ecdc4, #44a08d);
    color: white;
  }

  .btn-secondary:hover {
    background: linear-gradient(45deg, #38b2ac, #319795);
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .text-input {
    padding: 1rem 1.5rem;
    border: 2px solid #e2e8f0;
    border-radius: 15px;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    background: rgba(255, 255, 255, 0.8);
  }

  .text-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    background: white;
  }

  .text-preview {
    padding: 1rem;
    background: linear-gradient(45deg, #f7fafc, #edf2f7);
    border-radius: 15px;
    border-left: 4px solid #667eea;
  }

  .preview-label {
    font-weight: 600;
    color: #4a5568;
    margin-right: 0.5rem;
  }

  .preview-text {
    color: #667eea;
    font-weight: 500;
  }

  .toggle-btn {
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .reveal-box {
    animation: slideIn 0.5s ease-out;
    overflow: hidden;
  }

  .reveal-content {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: white;
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }

  .reveal-content h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
  }

  .reveal-content p {
    margin: 0;
    font-size: 1.1rem;
    opacity: 0.9;
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
    
    .container {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    
    .card {
      padding: 1.5rem;
    }
    
    .count-value {
      font-size: 3rem;
    }
  }
</style>