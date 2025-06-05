<!-- Register.svelte - Componente de registro corregido -->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { register } from '$lib/types/auth';

	// Estados reactivos con runas
	let email = $state('');
	let password = $state('');
	let confirmPassword = $state('');
	let error = $state('');
	let success = $state('');
	let isLoading = $state(false);
	let showPassword = $state(false);
	let showConfirmPassword = $state(false);

	// Validaciones derivadas corregidas - COMO VALORES, NO FUNCIONES
	const emailValid = $derived(() => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return email.length > 0 && emailRegex.test(email);
	});
	
	const passwordValid = $derived(() => {
		return password.length >= 8 &&
			/[A-Z]/.test(password) &&
			/[a-z]/.test(password) &&
			/\d/.test(password);
	});
	
	const passwordsMatch = $derived(() => password === confirmPassword && confirmPassword.length > 0);
	
	// CORREGIDO: Usar las funciones derivadas correctamente
	const formValid = $derived(() => emailValid() && passwordValid() && passwordsMatch());

	// Estado del formulario
	const formState = $derived(() => ({
		email: email.trim(),
		password,
		confirmPassword,
		isValid: formValid(),
		hasErrors: error.length > 0,
		hasSuccess: success.length > 0,
		isSubmitting: isLoading
	}));

	// Requisitos de contraseña como estado derivado
	const passwordRequirements = $derived(() => [
		{ text: 'Mínimo 8 caracteres', met: password.length >= 8 },
		{ text: 'Contiene letra mayúscula', met: /[A-Z]/.test(password) },
		{ text: 'Contiene letra minúscula', met: /[a-z]/.test(password) },
		{ text: 'Contiene número', met: /\d/.test(password) }
	]);

	// Texto del botón dinámico
	const submitButtonText = $derived(() => 
		isLoading ? 'Registrando...' :
		!formValid() ? 'Completa el formulario' :
		'Crear Cuenta'
	);

	// Efectos secundarios
	$effect(() => {
		// Limpiar mensajes cuando el usuario empiece a escribir
		if (email || password || confirmPassword) {
			if (error || success) {
				error = '';
				success = '';
			}
		}
	});

	async function handleRegister(event: Event) {
		event.preventDefault();
		
		// Validaciones previas usando el estado derivado
		if (!formValid()) {
			if (!emailValid()) {
				error = 'Por favor ingresa un email válido';
				return;
			}
			if (!passwordValid()) {
				error = 'La contraseña debe cumplir todos los requisitos';
				return;
			}
			if (!passwordsMatch()) {
				error = 'Las contraseñas no coinciden';
				return;
			}
		}

		isLoading = true;
		error = '';
		success = '';

		try {
			const result = await register(formState().email, password);
			
			if (result.success) {
				success = result.message || 'Registro exitoso. Redirigiendo al login...';
				
				// Redirigir después de 2 segundos
				setTimeout(() => {
					goto('/login');
				}, 2000);
			} else {
				error = result.message || 'Ocurrió un error desconocido.';
			}
		} catch (err) {
			error = 'Error de conexión. Intenta de nuevo.';
			console.error('Register error:', err);
		} finally {
			isLoading = false;
		}
	}

	// Funciones auxiliares
	const togglePasswordVisibility = () => {
		showPassword = !showPassword;
	};

	const toggleConfirmPasswordVisibility = () => {
		showConfirmPassword = !showConfirmPassword;
	};

	const clearForm = () => {
		email = '';
		password = '';
		confirmPassword = '';
		error = '';
		success = '';
	};

	// Log del estado para debugging (solo en desarrollo)
	$effect(() => {
		if (import.meta.env.DEV) {
			console.log('Register Form State:', formState());
		}
	});
</script>

<div class="register-container">
	<div class="wrapper">
		<h1>Crear Cuenta</h1>
		
		<form onsubmit={handleRegister}>
			<div class="input-box">
				<input 
					type="email" 
					bind:value={email} 
					placeholder="Correo electrónico" 
					required 
					disabled={isLoading}
					class:valid={emailValid()}
					class:invalid={!emailValid() && email.length > 0}
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
					class:valid={passwordValid()}
					class:invalid={!passwordValid() && password.length > 0}
					autocomplete="new-password"
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

			<!-- Requisitos de contraseña usando estado derivado -->
			{#if password.length > 0}
				<div class="password-requirements">
					{#each passwordRequirements() as requirement}
						<div class="requirement" class:met={requirement.met}>
							{requirement.met ? '✓' : '•'} {requirement.text}
						</div>
					{/each}
				</div>
			{/if}
			
			<div class="input-box">
				<input 
					type={showConfirmPassword ? 'text' : 'password'}
					bind:value={confirmPassword} 
					placeholder="Confirmar contraseña" 
					required 
					disabled={isLoading}
					class:valid={passwordsMatch()}
					class:invalid={!passwordsMatch() && confirmPassword.length > 0}
					autocomplete="new-password"
				/>
				<button 
					type="button" 
					class="toggle-password"
					onclick={toggleConfirmPasswordVisibility}
					disabled={isLoading}
					aria-label={showConfirmPassword ? 'Ocultar confirmación' : 'Mostrar confirmación'}
				>
					{showConfirmPassword ? '✗' : '👁'}
				</button>
				{#if confirmPassword.length > 0}
					<span class="validation-icon">
						{passwordsMatch() ? '✓' : '✗'}
					</span>
				{/if}
			</div>

			{#if error}
				<div class="error-message" role="alert">
					<span class="error-icon">⚠</span>
					{error}
				</div>
			{/if}

			{#if success}
				<div class="success-message" role="status">
					<span class="success-icon">✓</span>
					{success}
				</div>
			{/if}

			<button
				type="submit"
				class="btn"
				disabled={isLoading || !formValid()}
			>
				{#if isLoading}
					<span class="loading-spinner"></span>
				{/if}
				{submitButtonText()}
			</button>
		</form>

		<div class="login-link">
			<p>¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a></p>
		</div>

		<!-- Debug info (solo en desarrollo) -->
		{#if import.meta.env.DEV}
			<details style="margin-top: 20px; color: rgba(255,255,255,0.7); font-size: 12px;">
				<summary>Debug Info</summary>
				<pre>{JSON.stringify(formState(), null, 2)}</pre>
				<button type="button" onclick={clearForm} style="margin-top: 10px;">
					Clear Form
				</button>
			</details>
		{/if}
	</div>
</div>

<style>
	.register-container {
		font-family: "Montserrat", sans-serif;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding: 20px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		box-sizing: border-box;
	}

	.register-container *,
	.register-container *::before,
	.register-container *::after {
		box-sizing: border-box;
	}

	.wrapper {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.2);
		width: 100%;
		max-width: 450px;
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
		margin: 20px 0;
		width: 100%;
		height: 55px;
	}

	.input-box input {
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid rgba(255, 255, 255, 0.2);
		border-radius: 40px;
		padding: 0 80px 0 20px;
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

	/* Estados de validación mejorados */
	.input-box input.valid {
		border-color: rgba(76, 175, 80, 0.8);
		background: rgba(76, 175, 80, 0.1);
		box-shadow: 0 0 10px rgba(76, 175, 80, 0.3);
	}

	.input-box input.invalid {
		border-color: rgba(244, 67, 54, 0.8);
		background: rgba(244, 67, 54, 0.1);
		box-shadow: 0 0 10px rgba(244, 67, 54, 0.3);
	}

	.input-box input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.input-box input::placeholder {
		color: rgba(255, 255, 255, 0.7);
		font-size: 14px;
	}

	.input-box .email-icon {
		position: absolute;
		right: 30px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 18px;
		opacity: 0.7;
	}

	.toggle-password {
		position: absolute;
		right: 30px;
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

	.validation-icon {
		position: absolute;
		right: 60px;
		top: 50%;
		transform: translateY(-50%);
		font-size: 16px;
		font-weight: bold;
		z-index: 1;
	}

	/* Íconos de validación con colores específicos */
	.input-box input.valid ~ .validation-icon {
		color: #4caf50;
	}

	.input-box input.invalid ~ .validation-icon {
		color: #f44336;
	}

	.password-requirements {
		margin: -10px 0 15px 0;
		font-size: 12px;
		padding: 10px;
		background: rgba(255, 255, 255, 0.05);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.requirement {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 2px 0;
		opacity: 0.7;
		transition: all 0.3s ease;
		color: rgba(255, 255, 255, 0.8);
	}

	.requirement.met {
		opacity: 1;
		color: #4caf50;
		font-weight: 500;
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

	.success-message {
		background: rgba(76, 175, 80, 0.8);
		color: white;
		padding: 12px 16px;
		border-radius: 25px;
		margin: 15px 0;
		font-size: 14px;
		display: flex;
		align-items: center;
		gap: 8px;
		border: 1px solid rgba(76, 175, 80, 0.3);
		animation: slideIn 0.3s ease;
	}

	.error-icon, .success-icon {
		font-size: 16px;
	}

	@keyframes slideIn {
		from { opacity: 0; transform: translateY(-10px); }
		to { opacity: 1; transform: translateY(0); }
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
		margin-top: 20px;
	}

	.btn:hover:not(:disabled) {
		background: linear-gradient(45deg, #f8f8f8, #e8e8e8);
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
		background: linear-gradient(45deg, #ccc, #bbb);
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

	.login-link {
		text-align: center;
		margin-top: 25px;
		font-size: 14px;
	}

	.login-link p {
		color: rgba(255, 255, 255, 0.8);
	}

	.login-link a {
		color: white;
		text-decoration: none;
		font-weight: 600;
		transition: all 0.3s ease;
	}

	.login-link a:hover {
		text-decoration: underline;
		color: rgba(255, 255, 255, 0.9);
	}

	/* Responsive design */
	@media (max-width: 480px) {
		.wrapper {
			padding: 30px 25px;
			margin: 10px;
			max-width: 100%;
		}
		
		.wrapper h1 {
			font-size: 28px;
		}
		
		.input-box {
			height: 50px;
		}

		.input-box input {
			padding: 0 70px 0 15px;
			font-size: 14px;
		}

		.input-box input::placeholder {
			font-size: 13px;
		}

		.validation-icon {
			right: 50px;
		}
	}
</style>