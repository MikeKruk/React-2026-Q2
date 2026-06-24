import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL_API, CACHE_TTL } from '../../../shared/constants/constants';
import type { Pokemon } from '../types/types';
import { fetchPokemonList } from './fetchPokemonList';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL_API }),
  keepUnusedDataFor: CACHE_TTL,
  tagTypes: ['PokemonList', 'Pokemon'],
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      { results: Pokemon[]; count: number },
      { limit: number; offset: number }
    >({
      queryFn: async ({ limit, offset }) => {
        try {
          const data = await fetchPokemonList(limit, offset);
          return { data };
        } catch {
          return {
            error: {
              status: 500,
              data: 'Failed to get pokemon list',
            },
          };
        }
      },
      providesTags: ['PokemonList'],
    }),
    getPokemon: builder.query<Pokemon, string | number>({
      query: (param) => `/pokemon/${param}`,
      transformErrorResponse: (_, __, arg) => {
        return { status: 500, data: `Failed to get pokemon ${arg}` };
      },
      providesTags: (_, __, arg) => [{ type: 'Pokemon', id: arg }],
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonQuery } = pokemonApi;
