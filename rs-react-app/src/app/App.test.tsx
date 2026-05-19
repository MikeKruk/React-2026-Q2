import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LOCAL_STORAGE_KEY } from '../shared/constants/constants';
import { mockLocalStorage } from '../test-utils/mocks/mockLocalStorage';
import {
  mockItemPokemonsList1,
  mockItemPokemonsList2,
  mockPokemon,
  mockPokemon2,
} from '../test-utils/mocks/mockPokemon';
import App from './App';
import { getPokemon, getPokemonList } from '../features/search/api/api';

vi.mock('../features/search/api/api', () => {
  return {
    getPokemonList: vi.fn(),
    getPokemon: vi.fn(),
  };
});

function renderApp() {
  const rootRoute = createRootRoute({
    component: () => <Outlet />,
    notFoundComponent: () => <div>Not found</div>,
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '$page',
    component: App,
    parseParams: ({ page }) => ({ page: Number(page) }),
    stringifyParams: ({ page }) => ({ page: String(page) }),
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute]),
    history: createMemoryHistory({ initialEntries: ['/1'] }),
  });

  return render(<RouterProvider router={router} />);
}

describe('App', () => {
  let storage: ReturnType<typeof mockLocalStorage>;
  beforeEach(() => {
    storage = mockLocalStorage();
    Object.defineProperty(window, 'localStorage', {
      value: storage,
      writable: true,
    });

    vi.mocked(getPokemonList).mockResolvedValue({
      results: [{ ...mockItemPokemonsList1 }, { ...mockItemPokemonsList2 }],
      count: 2,
    });
    vi.mocked(getPokemon)
      .mockResolvedValueOnce(mockPokemon)
      .mockResolvedValueOnce(mockPokemon2);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('reads search term from localStorage on mount', async () => {
    renderApp();

    await waitFor(() => {
      expect(storage.getItem).toHaveBeenCalledWith(LOCAL_STORAGE_KEY);
    });
  });

  test('fetches pokemons list on mount when localStorage is empty', async () => {
    renderApp();

    await waitFor(() => {
      expect(getPokemonList).toHaveBeenCalled();
    });
  });

  test('shows loading indicator while fetching', async () => {
    vi.mocked(getPokemonList).mockReturnValue(new Promise(() => {}));
    renderApp();

    await waitFor(() => {
      const loader = screen.getByLabelText('Loading');

      expect(loader).toBeInTheDocument();
    });
  });

  test('fetches pokemon by name when localStorage has saved term', async () => {
    vi.mocked(getPokemon).mockResolvedValue(mockPokemon);
    storage.setItem(LOCAL_STORAGE_KEY, 'bulbasaur');
    renderApp();

    await waitFor(() => {
      expect(getPokemon).toHaveBeenCalledWith('bulbasaur');
    });
  });

  test('shows error state when fails', async () => {
    vi.mocked(getPokemonList).mockRejectedValue(
      new Error('Failed to get pokemon list')
    );
    renderApp();

    await waitFor(() => {
      expect(
        screen.getByText('Failed to get pokemon list')
      ).toBeInTheDocument();
    });
  });

  test('searches pokemon when search button is clicked', async () => {
    renderApp();
    const searchButton = await screen.findByRole('button', { name: 'Search' });
    const input = await screen.findByLabelText('Search field');

    await waitFor(() => {
      expect(getPokemonList).toHaveBeenCalled();
    });

    await userEvent.type(input, 'bulbasaur');
    await userEvent.click(searchButton);

    await waitFor(() => {
      expect(getPokemon).toHaveBeenCalledWith('bulbasaur');
    });
  });

  test('save search term to localStorage when search button is clicked', async () => {
    renderApp();
    const searchButton = await screen.findByRole('button', { name: 'Search' });
    const input = await screen.findByLabelText('Search field');

    await waitFor(() => {
      expect(getPokemonList).toHaveBeenCalled();
    });

    vi.mocked(getPokemon).mockResolvedValue(mockPokemon);

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
    vi.mocked(getPokemon).mockResolvedValue(mockPokemon);
    renderApp();
    const searchButton = await screen.findByRole('button', { name: 'Search' });
    await waitFor(() => {
      expect(getPokemon).toHaveBeenCalled();
    });

    await userEvent.click(searchButton);

    expect(getPokemon).toHaveBeenCalledTimes(1);
  });

  test('shows fallback error message when is error is not an Error instance ', async () => {
    vi.mocked(getPokemonList).mockRejectedValue('error');
    renderApp();

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });
});
