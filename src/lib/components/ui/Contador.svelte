<script>
  let count = $state(0);
  
  function increment() {
    count += 1;
  }
  
  function decrement() {
    count -= 1;
  }
</script>

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
    
    .count-value {
      font-size: 3rem;
    }
  }
</style>