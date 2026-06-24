import { Pokemon } from '@/entities/pokemon/types/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const pokemons: Pokemon[] = await request.json();
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

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${count}_pokemons.csv"`,
    },
  });
}
