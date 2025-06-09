<div class="header">
  <h1>Bienvenido a Svelte 5</h1>
  <p class="subtitle">Experimenta con la reactividad moderna</p>
</div>

<style>
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
    background-clip: text;
    animation: gradientShift 3s ease infinite;
  }

  .subtitle {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.9);
    margin-top: 0.5rem;
    font-weight: 300;
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
  }
</style>