import type { Pokemon } from '../../../entities/pokemon/types/types';

export async function downloadCSV(pokemons: Pokemon[]) {
  const response = await fetch('/api/scv', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pokemons),
  });

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${pokemons.length}_pokemons.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
