import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL_API, CACHE_TTL } from '../../../shared/constants/constants';
import type { Pokemon, PokemonListItem } from '../types/types';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API }),
  keepUnusedDataFor: CACHE_TTL,
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      { results: PokemonListItem[]; count: number },
      { limit: number; offset: number }
    >({
      query: ({ limit, offset }) => `/pokemon?limit=${limit}&offset=${offset}`,
      transformErrorResponse: () => 'Failed to get pokemon list',
    }),
    getPokemon: builder.query<Pokemon, string | number>({
      query: (param) => `/pokemon/${param}`,
      transformErrorResponse: (_, __, arg) => `Failed to get pokemon ${arg}`,
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonQuery } = pokemonApi;
