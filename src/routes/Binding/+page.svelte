<script>
    	import FancyInput from '$lib/components/FancyInput.svelte';

    let nombre =''
</script>

<h1>Welcome to binding</h1>

<FancyInput placeholder="Tu nombre" bind:value={nombre}/><br>
<br>
<p>Texto a tiempo real :{nombre}</p>



<!-- <script lang="ts">
	import FancyInput from '$lib/components/FancyInput.svelte';

	let message = $state('hello');


    let name = $state('');
	let email = $state('');
</script>

<FancyInput bind:value={message} />
<p>{message}</p>



<h1>Formulario</h1>

<FancyInput placeholder="Tu nombre" bind:value={name} />
<FancyInput placeholder="Tu correo" bind:value={email} />

<p>Nombre: {name}</p>
<p>Correo: {email}</p> -->