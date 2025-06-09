<script>
  let visible = $state(true);
  
  function toggleVisibility() {
    visible = !visible;
  }
</script>

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

<style>
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

  .card-header {
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
    color: #2d3748;
    margin: 0;
    font-weight: 600;
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

  .btn-secondary {
    background: linear-gradient(45deg, #4ecdc4, #44a08d);
    color: white;
  }

  .btn-secondary:hover {
    background: linear-gradient(45deg, #38b2ac, #319795);
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

  @media (max-width: 768px) {
    .card {
      padding: 1.5rem;
    }
  }
</style>