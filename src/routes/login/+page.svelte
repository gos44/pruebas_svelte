<script lang="ts">
  import { enhance } from '$app/forms';
    import { page } from '$app/stores';
  $: form = $page.form;

</script>

<h1>Iniciar sesión</h1>

<form method="POST" use:enhance>
  <label for="username">Usuario:</label>
  <input id="username" name="username" required />

  <label for="password">Contraseña:</label>
  <input id="password" name="password" type="password" required />

  <button type="submit">Entrar</button>
</form>

{#if form?.error}
  <p style="color: red;">{form.error}</p>
{/if}
