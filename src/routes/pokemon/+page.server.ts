import axios from 'axios';
import { PUBLIC_POKEMON_API_URL } from '$env/static/public';
import type { PageServerLoad } from './$types';
import type { Pokemon } from '$lib/stores/pokemonStore';

interface PokemonAPIResponse {
  results: {
    name: string;
    url: string;
  }[];
}

export const load: PageServerLoad = async () => {
  try {
    const response = await axios.get<PokemonAPIResponse>(`${PUBLIC_POKEMON_API_URL}pokemon?limit=151`);
    
    const pokemonData: Pokemon[] = response.data.results.map((p, index) => {
      const id = index + 1;
      return {
        name: p.name,
        url: p.url,
        id: id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
      };
    });

    // Retornamos los datos para que estén disponibles en el componente +page.svelte
    return {
      pokemons: pokemonData
    };
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return {
      pokemons: [],
      error: 'Could not fetch Pokémon data.'
    };
  }
};