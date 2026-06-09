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

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../app/context/ThemeContext';
import {
  pokemonApi,
  useGetPokemonListQuery,
  useGetPokemonQuery,
} from '../../entities/pokemon/api/pokemonApi';
import SelectedItemsReducer from '../../features/selectedItems/store/selectedItemsSlice';
import { LOCAL_STORAGE_KEY } from '../../shared/constants/constants';
import { mockLocalStorage } from '../../test-utils/mocks/mockLocalStorage';
import { mockPokemon } from '../../test-utils/mocks/mockPokemon';
import HomePage from './HomePage';

vi.mock('../../entities/pokemon/api/pokemonApi', () => {
  return {
    pokemonApi: {
      util: {
        invalidateTags: vi.fn(),
      },
    },
    useGetPokemonListQuery: vi.fn(),
    useGetPokemonQuery: vi.fn(),
  };
});

const mockList = useGetPokemonListQuery as ReturnType<typeof vi.fn>;
const mockSearch = useGetPokemonQuery as ReturnType<typeof vi.fn>;

function renderApp() {
  const testStore = configureStore({
    reducer: {
      selectedItems: SelectedItemsReducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
  
  const rootRoute = createRootRoute({
    component: () => (
      <Provider store={testStore}>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
      </Provider>
    ),
    notFoundComponent: () => <div>Not found</div>,
  });

  const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '$page',
    component: HomePage,
    parseParams: ({ page }) => ({ page: Number(page) }),
    stringifyParams: ({ page }) => ({ page: String(page) }),
  });

  const router = createRouter({
    routeTree: rootRoute.addChildren([indexRoute]),
    history: createMemoryHistory({ initialEntries: ['/1'] }),
  });

  return render(<RouterProvider router={router} />);
}

describe('HomePage', () => {
  let storage: ReturnType<typeof mockLocalStorage>;
  beforeEach(() => {
    storage = mockLocalStorage();
    Object.defineProperty(window, 'localStorage', {
      value: storage,
      writable: true,
    });

    mockList.mockReturnValue({
      data: { results: [], count: 0 },
      isLoading: false,
      error: undefined,
    });

    mockSearch.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: undefined,
    });
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

  test('calls useGetPokemonListQuery on mount when localStorage is empty', async () => {
    renderApp();

    await waitFor(() => {
      expect(useGetPokemonListQuery).toHaveBeenCalled();
    });
  });

  test('shows loading indicator while fetching', async () => {
    mockList.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });
    renderApp();

    await waitFor(() => {
      const loader = screen.getByLabelText('Loading');

      expect(loader).toBeInTheDocument();
    });
  });

  test('calls useGetPokemonQuery localStorage has saved term', async () => {
    storage.setItem(LOCAL_STORAGE_KEY, 'bulbasaur');
    renderApp();

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith(
        'bulbasaur',
        expect.objectContaining({ skip: false })
      );
    });
  });

  test('shows error state when fails', async () => {
    mockList.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 500, data: 'Failed to get pokemon list' },
    });
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

    await userEvent.type(input, 'bulbasaur');
    await userEvent.click(searchButton);

    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith(
        'bulbasaur',
        expect.objectContaining({ skip: false })
      );
    });
  });

  test('save search term to localStorage when search button is clicked', async () => {
    renderApp();
    const searchButton = await screen.findByRole('button', { name: 'Search' });
    const input = await screen.findByLabelText('Search field');

    await userEvent.type(input, 'bulbasaur');
    await userEvent.click(searchButton);

    await waitFor(() => {
      expect(storage.setItem).toHaveBeenCalledWith(
        LOCAL_STORAGE_KEY,
        'bulbasaur'
      );
    });
  });

  test('shows pokemon when search returns result', async () => {
    mockSearch.mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      error: undefined,
    });
    storage.setItem(LOCAL_STORAGE_KEY, 'bulbasaur');
    renderApp();
    await waitFor(() => {
      expect(useGetPokemonQuery).toHaveBeenCalled();
    });
  });

  test('shows fallback error message when has no message', async () => {
    mockList.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 500, data: 'Something went wrong' },
    });
    renderApp();

    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });
});
