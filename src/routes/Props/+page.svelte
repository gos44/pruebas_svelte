<script lang="ts">
import TarjetaUsuario from "$lib/components/TarjetaUsuario.svelte";
let usuario = { nombre: "Gos", edad:30};
</script>
<h1>Welcome to Props</h1>
<br>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<br><br>

<TarjetaUsuario {usuario}/>