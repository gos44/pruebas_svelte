<!-- Login.svelte - Componente de login mejorado -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import { login } from '$lib/types/auth';
  import { browser } from '$app/environment';

  // Estados reactivos con runas
  let email = $state('');
  let password = $state('');
  let error = $state('');
  let isLoading = $state(false);
  let rememberMe = $state(false);
  let showPassword = $state(false);

  // Validaciones derivadas
  const emailValid = $derived(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.length > 0 && emailRegex.test(email);
  });
  
  const passwordValid = $derived(() => password.length > 0);
  const formValid = $derived(() => emailValid() && passwordValid());

  // Estado consolidado del formulario
  const formState = $derived({
    email: email.trim(),
    password,
    rememberMe,
    isValid: formValid,
    hasError: error.length > 0,
    isSubmitting: isLoading,
    canSubmit: formValid() && !isLoading
  });

  // Texto dinámico del botón
  const submitButtonText = $derived(
    isLoading ? 'Iniciando sesión...' :
    !formValid ? 'Completa los campos' :
    'Iniciar Sesión'
  );

  // Efectos secundarios
  $effect(() => {
    // Limpiar error cuando el usuario escriba
    if (email || password) {
      if (error) {
        error = '';
      }
    }
  });

  // Efecto para localStorage (solo en el browser)
  $effect(() => {
    if (browser) {
      if (rememberMe && email && emailValid()) {
        localStorage.setItem('rememberedEmail', email);
      } else if (!rememberMe) {
        localStorage.removeItem('rememberedEmail');
      }
    }
  });

  // Cargar email recordado al montar (solo en el browser)
  $effect(() => {
    if (browser) {
      const rememberedEmail = localStorage.getItem('rememberedEmail');
      if (rememberedEmail && !email) {
        email = rememberedEmail;
        rememberMe = true;
      }
    }
  });

  async function handleLogin(event: Event) {
    event.preventDefault();
    
    if (!formState.canSubmit) {
      if (!emailValid) {
        error = 'Por favor ingresa un email válido';
        return;
      }
      if (!passwordValid) {
        error = 'Por favor ingresa tu contraseña';
        return;
      }
    }

    isLoading = true;
    error = '';
    
    try {
      const result = await login(formState.email, password);
      
      if (result.success) {
        // Si el login es exitoso y "recordarme" está marcado
        if (browser && rememberMe) {
          localStorage.setItem('rememberedEmail', formState.email);
        }
        
        // Redirigir al usuario
        goto('/');
      } else {
        error = result.message || 'Error desconocido';
      }
    } catch (err) {
      error = 'Error de conexión. Intenta de nuevo.';
      console.error('Login error:', err);
    } finally {
      isLoading = false;
    }
  }

  // Funciones auxiliares
  const togglePasswordVisibility = () => {
    showPassword = !showPassword;
  };

  const clearForm = () => {
    email = '';
    password = '';
    error = '';
    rememberMe = false;
  };

  // Log del estado para debugging (solo en desarrollo)
  $effect(() => {
    if (import.meta.env.DEV) {
      console.log('Login Form State:', formState);
    }
  });
</script>

<div class="login-container">
  <div class="wrapper">
    <h1>Iniciar Sesión</h1>
    
    <form onsubmit={handleLogin}>
      <div class="input-box">
        <input 
          type="email" 
          bind:value={email}
          placeholder="Correo electrónico" 
          required 
          disabled={isLoading}
          class:valid={emailValid}
          class:invalid={!emailValid && email.length > 0}
          autocomplete="email"
        />
        <i class="email-icon">✉</i>
        {#if email.length > 0}
          <span class="validation-icon">
            {emailValid() ? '✓' : '✗'}
          </span>
        {/if}
      </div>
      
      <div class="input-box">
        <input 
          type={showPassword ? 'text' : 'password'}
          bind:value={password}
          placeholder="Contraseña" 
          required 
          disabled={isLoading}
          class:valid={passwordValid}
          class:invalid={!passwordValid && password.length > 0}
          autocomplete="current-password"
        />
        <button 
          type="button" 
          class="toggle-password"
          onclick={togglePasswordVisibility}
          disabled={isLoading}
          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {showPassword ? '✗' : '👁'}
        </button>
        {#if password.length > 0}
          <span class="validation-icon">
            {passwordValid() ? '✓' : '✗'}
          </span>
        {/if}
      </div>

      {#if error}
        <div class="error-message" role="alert">
          <span class="error-icon">⚠</span>
          {error}
        </div>
      {/if}

      <div class="remember-forgot">
        <label>
          <input 
            type="checkbox" 
            bind:checked={rememberMe}
            disabled={isLoading}
          /> 
          Recordarme
        </label>
        <a href="/forgot-password">¿Olvidaste tu contraseña?</a>
      </div>

      <button 
        type="submit" 
        class="btn" 
        disabled={!formState.canSubmit}
      >
        {#if isLoading}
          <span class="loading-spinner"></span>
        {/if}
        {submitButtonText}
      </button>
    </form>

    <div class="register-link">
      <p>¿No tienes cuenta? <a href="/register">Regístrate aquí</a></p>
    </div>

    <!-- Panel de debug (solo en desarrollo) -->
    {#if import.meta.env.DEV}
      <details style="margin-top: 20px; color: rgba(255,255,255,0.7); font-size: 12px;">
        <summary>Debug Info</summary>
        <pre>{JSON.stringify(formState, null, 2)}</pre>
        <button type="button" onclick={clearForm} style="margin-top: 10px;">
          Clear Form
        </button>
      </details>
    {/if}
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
  .email-icon {
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		color: white;
		font-size: 18px;
		cursor: pointer;
		opacity: 0.7;
		transition: opacity 0.3s ease;
		padding: 5px;
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
  .validation-icon {
		position: absolute;
		right: 12px;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		color: white;
		font-size: 18px;
		cursor: pointer;
		opacity: 0.7;
		transition: opacity 0.3s ease;
		padding: 5px;
	}
  

  .toggle-password {
		position: absolute;
		right: 35px;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		color: white;
		font-size: 18px;
		cursor: pointer;
		opacity: 0.7;
		transition: opacity 0.3s ease;
		padding: 5px;
	}

	.toggle-password:hover:not(:disabled) {
		opacity: 1;
	}

	.toggle-password:disabled {
		cursor: not-allowed;
		opacity: 0.4;
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
    right: 35px;
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