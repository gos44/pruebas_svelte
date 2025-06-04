<script>
  import { goto } from '$app/navigation';
  import { login } from '$lib/types/auth';

  let email = '';
  let password = '';
  let error = '';
  let isLoading = false;

  async function handleLogin() {
    if (!email || !password) {
      error = 'Por favor completa todos los campos';
      return;
    }

    isLoading = true;
    error = '';
    
    try {
      const success = await login(email, password);
      if (success) {
        goto('/');
      } else {
        error = 'Credenciales inválidas';
      }
    } catch (err) {
      error = 'Error de conexión. Intenta de nuevo.';
      console.error('Login error:', err);
    } finally {
      isLoading = false;
    }
  }

  function clearError() {
    error = '';
  }
</script>

<div class="login-container">
  <div class="wrapper">
    <h1>Iniciar Sesión</h1>
    
    <form on:submit|preventDefault={handleLogin}>
      <div class="input-box">
        <input 
          type="email" 
          bind:value={email} 
          placeholder="Correo electrónico" 
          required 
          disabled={isLoading}
          on:input={clearError}
        />
        <i class="email-icon">✉</i>
      </div>
      
      <div class="input-box">
        <input 
          type="password" 
          bind:value={password} 
          placeholder="Contraseña" 
          required 
          disabled={isLoading}
          on:input={clearError}
        />
        <i class="lock-icon">🔒</i>
      </div>

      {#if error}
        <div class="error-message">
          <span class="error-icon">⚠</span>
          {error}
        </div>
      {/if}

      <div class="remember-forgot">
        <label>
          <input type="checkbox" /> Recordarme
        </label>
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
      </div>

      <button type="submit" class="btn" disabled={isLoading}>
        {#if isLoading}
          <span class="loading-spinner"></span>
          Iniciando sesión...
        {:else}
          Iniciar Sesión
        {/if}
      </button>
    </form>

    <div class="register-link">
      <p>¿No tienes cuenta? <a href="/signup">Regístrate aquí</a></p>
    </div>
  </div>
</div>

<style>
  .login-container {
    font-family: "Montserrat", sans-serif;
  }

  .login-container {
    font-family: "Montserrat", sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-sizing: border-box;
  }

  .login-container *,
  .login-container *::before,
  .login-container *::after {
    box-sizing: border-box;
  }

  .wrapper {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    width: 100%;
    max-width: 420px;
    color: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
    margin: 0;
  }

  .wrapper:hover {
    transform: translateY(-5px);
  }

  .wrapper h1 {
    font-size: 32px;
    text-align: center;
    margin-bottom: 30px;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .input-box {
    position: relative;
    margin: 25px 0;
    width: 100%;
    height: 55px;
  }

  .input-box input {
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 40px;
    padding: 0 50px 0 20px;
    color: white;
    font-size: 16px;
    outline: none;
    transition: all 0.3s ease;
  }

  .input-box input:focus {
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }

  .input-box input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .input-box input::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }

  .input-box i {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 18px;
    opacity: 0.7;
  }

  .error-message {
    background: rgba(220, 53, 69, 0.8);
    color: white;
    padding: 12px 16px;
    border-radius: 25px;
    margin: 15px 0;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(220, 53, 69, 0.3);
    animation: slideIn 0.3s ease;
  }

  .error-icon {
    font-size: 16px;
  }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .remember-forgot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin: 20px 0;
  }

  .remember-forgot label {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
  }

  .remember-forgot label input {
    accent-color: white;
    width: auto;
    height: auto;
    margin: 0;
    border-radius: 3px;
  }

  .remember-forgot a {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .remember-forgot a:hover {
    color: white;
    text-decoration: underline;
  }

  .btn {
    width: 100%;
    height: 50px;
    background: linear-gradient(45deg, #fff, #f0f0f0);
    border: none;
    border-radius: 40px;
    font-size: 16px;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .btn:hover:not(:disabled) {
    background: linear-gradient(45deg, #f8f8f8, #e8e8e8);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  .btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .loading-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid #ccc;
    border-top: 2px solid #333;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .register-link {
    text-align: center;
    margin-top: 25px;
    font-size: 14px;
  }

  .register-link p {
    color: rgba(255, 255, 255, 0.8);
  }

  .register-link a {
    color: white;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .register-link a:hover {
    text-decoration: underline;
    color: rgba(255, 255, 255, 0.9);
  }

  /* Responsive design */
  @media (max-width: 480px) {
    .wrapper {
      padding: 30px 25px;
      margin: 10px;
    }
    
    .wrapper h1 {
      font-size: 28px;
    }
    
    .input-box {
      height: 50px;
    }
  }
</style>