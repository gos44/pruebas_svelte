<script>
    let nombre =''
    function mostrarSaludo(){
        alert  (`hola ${nombre}`)
    }


</script>

<h1>Welcome to binding</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<input placeholder="Tu nombre" bind:value={nombre}/><br>
<button onclick={mostrarSaludo}>Saludar</button>
<br>
<p>Texto a tiempo real :{nombre}</p>