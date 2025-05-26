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
		numeros = [...numeros];
	}
    let frutas = ["🍎 Manzana", "🍌 Banana", "🍍 Piña"];

</script>

<section>
    <h2>Números</h2>
    <ul>
        {#each numeros as n}
            <li >{n}</li>
        {/each}
    </ul>
    <button onclick={agregarNumero}>Agregar número</button>
</section>
<br><br>
{#each frutas as fruta}
	<p>{fruta}</p>
{:else}
	<p>No hay frutas 😢</p>
{/each}

<style>
	li{
		font-size: 20px;
		color: #2C2020FF;
		margin-left: 30px;
	}
	button {
		background-color: #2C2020FF;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
		margin-top: 5px;
		margin-left: 20px;
	}
</style>