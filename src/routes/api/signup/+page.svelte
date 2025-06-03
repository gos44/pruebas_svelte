<script>
	let error = '';
</script>

<form method="POST">
	<input name="username" placeholder="Usuario" required />
	<input name="password" type="password" placeholder="Contraseña" required />
	<button type="submit">Registrarse</button>

	{#if error}
		<p style="color: red">{error}</p>
	{/if}
</form>

<p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
