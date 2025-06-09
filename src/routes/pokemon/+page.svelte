<script lang="ts">
  import { onMount } from 'svelte';
  import { pokemonStore, type Pokemon } from '$lib/stores/pokemonStore';
  import type { PageData } from './$types';

  // 'data' contiene lo que retornamos desde la función 'load' en +page.server.ts
  export let data: PageData;

  // Sincronizamos los datos cargados desde el servidor con nuestra tienda global
  onMount(() => {
    if (data.pokemons) {
      pokemonStore.set(data.pokemons);
    }
  });
</script>

<svelte:head>
  <title>Pokédex con SvelteKit</title>
  <meta name="description" content="Lista de los primeros 151 Pokémon" />
</svelte:head>

<main class="container">
  <h1>Pokédex  Pokémons</h1>

  {#if data.error}
    <p class="error">{data.error}</p>
  {:else if $pokemonStore.length > 0}
    <div class="grid">
      {#each $pokemonStore as pokemon (pokemon.id)}
        <a href="https://www.pokemon.com/es/pokedex/{pokemon.name}" target="_blank" class="card">
          <img src={pokemon.image} alt={pokemon.name} />
          <h2>{pokemon.id}. {pokemon.name}</h2>
        </a>
      {/each}
    </div>
  {:else}
    <p>Cargando Pokémon...</p>
  {/if}
</main>

<style>
  .container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
    font-family: sans-serif;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
  }
  .card {
    text-decoration: none;
    color: #333;
    background: #f4f4f4;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    transition: transform 0.2s ease-in-out;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  .card:hover {
    transform: translateY(-5px);
  }
  .card img {
    width: 120px;
    height: 120px;
  }
  .card h2 {
    font-size: 1rem;
    margin-top: 0.5rem;
    text-transform: capitalize;
  }
  .error {
    color: red;
    text-align: center;
  }
</style>