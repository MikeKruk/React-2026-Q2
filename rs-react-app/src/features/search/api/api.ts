import { BASE_URL_API, MAX_LIMIT } from '../../../shared/constants/constants';
import type { Pokemon, PokemonListItem } from '../../../shared/types/types';
class Api {
  async getPokemonList(
    limit = MAX_LIMIT,
    offset = 0
  ): Promise<{ results: PokemonListItem[] }> {
    const response = await fetch(
      `${BASE_URL_API}/pokemon?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) throw new Error('Failed to get pokemon list');

    return response.json();
  }
  async getPokemonByName(name: string): Promise<Pokemon> {
    const response = await fetch(`${BASE_URL_API}/pokemon/${name}`);
    if (!response.ok) throw new Error(`Failed to get pokemon ${name}`);

    return response.json();
  }

  async getPokemonDescription(name: string): Promise<string> {
    const response = await fetch(`${BASE_URL_API}/pokemon-species/${name}`);
    if (!response.ok)
      throw new Error(`Failed to get pokemon description ${name}`);

    return response.json();
  }
}

export const api = new Api();
