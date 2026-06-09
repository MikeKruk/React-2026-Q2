import { configureStore } from '@reduxjs/toolkit';
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
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../../app/context/ThemeContext';
import SelectedItemsReducer from '../../../features/selectedItems/store/selectedItemsSlice';
import { mockPokemon } from '../../../test-utils/mocks/mockPokemon';
import { useGetPokemonQuery } from '../api/pokemonApi';
import PokemonDetails from './PokemonDetails';

vi.mock('../api/pokemonApi', () => {
  return {
    pokemonApi: {
      util: {
        invalidateTags: vi.fn(),
      },
    },
    useGetPokemonQuery: vi.fn(),
  };
});

const mockPokemonQuery = useGetPokemonQuery as ReturnType<typeof vi.fn>;

function renderPokemonDetails(detailsId = 1, page = 1) {
  const testStore = configureStore({
    reducer: {
      selectedItems: SelectedItemsReducer,
    },
  });
  const rootRoute = createRootRoute({
    component: () => (
      <Provider store={testStore}>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
      </Provider>
    ),
  });
  const pageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '$page',
    parseParams: ({ page }) => ({ page: Number(page) }),
    stringifyParams: ({ page }) => ({ page: String(page) }),
    component: () => <Outlet />,
  });
  const detailRoute = createRoute({
    getParentRoute: () => pageRoute,
    path: '$detailsId',
    parseParams: ({ detailsId }) => ({ detailsId: Number(detailsId) }),
    stringifyParams: ({ detailsId }) => ({ detailsId: String(detailsId) }),
    component: PokemonDetails,
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([pageRoute.addChildren([detailRoute])]),
    history: createMemoryHistory({ initialEntries: [`/${page}/${detailsId}`] }),
  });
  return render(<RouterProvider router={router} />);
}

describe('PokemonDetails', () => {
  afterEach(() => vi.clearAllMocks());

  test('shows loading indicator while fetching', async () => {
    mockPokemonQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });
    renderPokemonDetails();
    await waitFor(() => {
      expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    });
  });

  test('shows pokemon details after fetch', async () => {
    mockPokemonQuery.mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      error: undefined,
    });
    renderPokemonDetails();
    await waitFor(() => {
      expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
    });
  });

  test('shows error when fetch fails', async () => {
    mockPokemonQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: {
        status: 500,
        data: 'Failed to get pokemon 1',
      },
    });
    renderPokemonDetails();
    await waitFor(() => {
      expect(screen.getByText('Failed to get pokemon 1')).toBeInTheDocument();
    });
  });

  test('closes details when close button clicked', async () => {
    mockPokemonQuery.mockReturnValue({
      data: mockPokemon,
      isLoading: false,
      error: undefined,
    });
    renderPokemonDetails();
    await waitFor(() => {
      expect(screen.getByLabelText('Close details')).toBeInTheDocument();
    });
    await userEvent.click(screen.getByLabelText('Close details'));
    await waitFor(() => {
      expect(screen.queryByText(mockPokemon.name)).not.toBeInTheDocument();
    });
  });
});
