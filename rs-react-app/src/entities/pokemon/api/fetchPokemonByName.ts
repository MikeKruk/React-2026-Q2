import { BASE_URL_API } from '@/shared/constants/constants';
import { Pokemon } from '../types/types';

export async function fetchPokemonByName(param: string | number): Promise<Pokemon> {
  const response = await fetch(`${BASE_URL_API}pokemon/${param}`);
  if (!response.ok) throw new Error(`Failed to get pokemon ${param}`);
  return response.json();
}
