import { mockFetch, mockFetchError } from '../../../test-utils/mocks/mockApi';
import {
  mockItemPokemonsList1,
  mockItemPokemonsList2,
  mockPokemon,
} from '../../../test-utils/mocks/mockPokemon';
import { api } from './api';

describe('API', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('getPokemonList', () => {
    test('returns pokemons list on success', async () => {
      mockFetch({
        results: [{ ...mockItemPokemonsList1 }, { ...mockItemPokemonsList2 }],
      });

      const result = await api.getPokemonList();

      expect(result.results[0].name).toBe('bulbasaur');
      expect(result.results[1].name).toBe('ivysaur');
    });

    test('throws error on failure', async () => {
      mockFetchError();

      await expect(api.getPokemonList()).rejects.toThrow('Failed to get pokemon list');
    });
  });

  describe('getPokemonByName', () => {
    test('return correct pokemon on success', async () => {
      mockFetch(mockPokemon);

      const result = await api.getPokemonByName(mockItemPokemonsList1.name);

      expect(result.name).toBe(mockPokemon.name);
    });

    test('throws error on failure', async () => {
      mockFetchError();
      const name = mockItemPokemonsList1.name;

      await expect(api.getPokemonByName(name)).rejects.toThrow(`Failed to get pokemon ${name}`);
    });
  });
});
