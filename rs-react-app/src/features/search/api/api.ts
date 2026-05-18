import { BASE_URL_API, MAX_LIMIT } from '../../../shared/constants/constants';
import type { Pokemon, PokemonListItem } from '../../../shared/types/types';

async function getPokemonList(
  limit = MAX_LIMIT,
  offset = 0
): Promise<{ results: PokemonListItem[], count: number }> {
  const response = await fetch(
    `${BASE_URL_API}/pokemon?limit=${limit}&offset=${offset}`
  );
  if (!response.ok) throw new Error('Failed to get pokemon list');

  return response.json();
}

async function getPokemon(param: string | number): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL_API}/pokemon/${param}`);
  if (!response.ok) throw new Error(`Failed to get pokemon ${param}`);

  return response.json();
}

export { getPokemon, getPokemonList };
