<!-- src/routes/profile/+page.svelte -->
<script lang="ts">
	export let data;
	const { user } = data;
</script>

<h1>Perfil de usuario</h1>
<p><strong>Nombre:</strong> {user.name}</p>
<p><strong>Email:</strong> {user.email}</p>
