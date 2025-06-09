import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

// Define la interfaz para la estructura de un Pokémon
export interface Pokemon {
  name: string;
  url: string;
  id: number;
  image: string;
}

// Crea la tienda utilizando writable, inicializada con un array vacío
export const pokemonStore: Writable<Pokemon[]> = writable([]);