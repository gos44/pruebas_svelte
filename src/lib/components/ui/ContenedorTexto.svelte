<script>
  let text = $state("¡Escribe algo!");
</script>

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

  @media (max-width: 768px) {
    .card {
      padding: 1.5rem;
    }
  }
</style>