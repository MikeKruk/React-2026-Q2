import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL_API, CACHE_TTL } from '../../../shared/constants/constants';
import type { Pokemon, PokemonListItem } from '../types/types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API }),
  keepUnusedDataFor: CACHE_TTL,
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      { results: Pokemon[]; count: number },
      { limit: number; offset: number }
    >({
      queryFn: async ({ limit, offset }) => {
        try {
          const response = await fetch(
            `${BASE_URL_API}pokemon?limit=${limit}&offset=${offset}`
          );
          if (!response.ok) throw new Error('Failed to get pokemon list');
          const {
            results,
            count,
          }: { results: PokemonListItem[]; count: number } =
            await response.json();
          const pokemons = await Promise.all(
            results.map((pokemon) =>
              fetch(`${BASE_URL_API}pokemon/${pokemon.name}`).then((res) =>
                res.json()
              )
            )
          );
          return { data: { results: pokemons, count } };
        } catch {
          return {
            error: {
              status: 500,
              data: 'Failed to get pokemon list',
            },
          };
        }
      },
    }),
    getPokemon: builder.query<Pokemon, string | number>({
      query: (param) => `/pokemon/${param}`,
      transformErrorResponse: (_, __, arg) => {
        return { status: 500, data: `Failed to get pokemon ${arg}` };
      },
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonQuery } = pokemonApi;
