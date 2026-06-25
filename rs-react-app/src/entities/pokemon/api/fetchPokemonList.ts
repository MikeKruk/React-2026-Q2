import { BASE_URL_API } from '@/shared/constants/constants';
import { PokemonListItem } from '../types/types';

export async function fetchPokemonList(limit: number, offset: number) {
  const response = await fetch(
    `${BASE_URL_API}pokemon?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) throw new Error('failedToGetPokemonList');
  const { results, count }: { results: PokemonListItem[]; count: number } =
    await response.json();
  const pokemons = await Promise.all(
    results.map(async (pokemon) => {
      const response = await fetch(`${BASE_URL_API}pokemon/${pokemon.name}`);
      if (!response.ok) throw new Error('failedToGetPokemonList');
      return response.json();
    })
  );
  return { results: pokemons, count };
}
