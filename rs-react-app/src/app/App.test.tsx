import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { api } from '../features/search/api/api';
import { LOCAL_STORAGE_KEY } from '../shared/constants/constants';
import { mockLocalStorage } from '../test-utils/mocks/mockLocalStorage';
import {
  mockItemPokemonsList1,
  mockItemPokemonsList2,
  mockPokemon,
  mockPokemon2,
} from '../test-utils/mocks/mockPokemon';
import App from './App';

vi.mock('../features/search/api/api', () => {
  return {
    api: {
      getPokemonList: vi.fn(),
      getPokemon: vi.fn(),
    },
  };
});

describe('App', () => {
  let storage: ReturnType<typeof mockLocalStorage>;
  beforeEach(() => {
    storage = mockLocalStorage();
    Object.defineProperty(window, 'localStorage', {
      value: storage,
      writable: true,
    });

    vi.mocked(api.getPokemonList).mockResolvedValue({
      results: [{ ...mockItemPokemonsList1 }, { ...mockItemPokemonsList2 }],
    });
    vi.mocked(api.getPokemon)
      .mockResolvedValueOnce(mockPokemon)
      .mockResolvedValueOnce(mockPokemon2);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('reads search term from localStorage on mount', async () => {
    render(<App />);

    await waitFor(() => {
      expect(storage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
    });
  });

  test('fetches pokemons list on mount when localStorage is empty', async () => {
    render(<App />);

    await waitFor(() => {
      expect(api.getPokemonList).toHaveBeenCalled();
    });
  });

  test('shows loading indicator while fetching', async () => {
    vi.mocked(api.getPokemonList).mockReturnValue(new Promise(() => {}));
    render(<App />);

    const loader = screen.getByLabelText('Loading');

    expect(loader).toBeInTheDocument();
  });

  test('fetches pokemon by name when localStorage has saved term', async () => {
    vi.mocked(api.getPokemon).mockResolvedValue(mockPokemon);
    storage.setItem(LOCAL_STORAGE_KEY, 'bulbasaur');
    render(<App />);

    await waitFor(() => {
      expect(api.getPokemon).toHaveBeenCalledWith('bulbasaur');
    });
  });

  test('shows error state when API fails', async () => {
    vi.mocked(api.getPokemonList).mockRejectedValue(
      new Error('Failed to get pokemon list')
    );
    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText('Failed to get pokemon list')
      ).toBeInTheDocument();
    });
  });

  test('searches pokemon when search button is clicked', async () => {
    render(<App />);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    const input = screen.getByLabelText('Search field');

    await waitFor(() => {
      expect(api.getPokemonList).toHaveBeenCalled();
    });

    await userEvent.type(input, 'bulbasaur');
    await userEvent.click(searchButton);

    await waitFor(() => {
      expect(api.getPokemon).toHaveBeenCalledWith('bulbasaur');
    });
  });

  test('save search term to localStorage when search button is clicked', async () => {
    render(<App />);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    const input = screen.getByLabelText('Search field');

    await waitFor(() => {
      expect(api.getPokemonList).toHaveBeenCalled();
    });

    vi.mocked(api.getPokemon).mockResolvedValue(mockPokemon);

    await userEvent.type(input, 'bulbasaur');
    await userEvent.click(searchButton);

    await waitFor(() => {
      expect(storage.setItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_KEY,
        'bulbasaur'
      );
    });
  });

  test('dosent fetch again when search term is the same', async () => {
    storage.setItem(LOCAL_STORAGE_KEY, 'bulbasaur');
    vi.mocked(api.getPokemon).mockResolvedValue(mockPokemon);
    render(<App />);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    await waitFor(() => {
      expect(api.getPokemon).toHaveBeenCalled();
    });

    await userEvent.click(searchButton);

    expect(api.getPokemon).toHaveBeenCalledTimes(1);
  });

  test('shows fallback error message when is error is not an Error instance ', async () => {
    vi.mocked(api.getPokemonList).mockRejectedValue('error');
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });
});
