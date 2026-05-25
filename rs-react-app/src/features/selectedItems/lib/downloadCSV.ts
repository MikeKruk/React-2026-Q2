import type { Pokemon } from '../../../entities/pokemon/types/types';

export function downloadCSV(pokemons: Pokemon[]) {
  const count = pokemons.length;
  const headers = [
    'id',
    'name',
    'height',
    'weight',
    'base_experience',
    'types',
    'url',
  ];
  const rows = pokemons.map((pokemon) => [
    pokemon.id,
    pokemon.name,
    pokemon.height,
    pokemon.weight,
    pokemon.base_experience,
    pokemon.types.map((type) => type.type.name).join('| '),
    `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`,
  ]);

  const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${count}_pokemons.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
