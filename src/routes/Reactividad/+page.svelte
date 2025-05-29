<script>
    let precio = 100
    let cantidad = 2
    $: total = precio * cantidad
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<label for="">Precio:<input type="text"bind:value={precio}></label><br>
<label for="">Cantidad<input type="text"bind:value={cantidad}></label>
<p>Total:${total}</p>