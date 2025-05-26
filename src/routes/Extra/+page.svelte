<!-- <script>
    import { suma,storeA,storeB } from "$lib/types/Extra";
</script>

<input type="number" bind:value={$storeA}>
<br>
<input type="number" bind:value={$storeB}>

<p>A:{$storeA}</p>
<p>B:{$storeB}</p>

<p>Resultado:{$suma}</p> -->


<script>
	let numeros = [1, 2, 3];

	function agregarNumero() {
		numeros.push(numeros.length + 1);
		// Reasignación para que Svelte detecte el cambio
		numeros = [...numeros];
	}


    	let frutas = ["🍎 Manzana", "🍌 Banana", "🍍 Piña"];

</script>

<ul>
	{#each numeros as n}
		<li>{n}</li>
	{/each}
</ul>

<button onclick={agregarNumero}>Agregar número</button>



{#each frutas as fruta}
	<p>{fruta}</p>
{:else}
	<p>No hay frutas 😢</p>
{/each}
