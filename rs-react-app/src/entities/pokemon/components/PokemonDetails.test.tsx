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
import { ThemeProvider } from '../../../app/context/ThemeContext';
import { mockPokemon } from '../../../test-utils/mocks/mockPokemon';
import { getPokemon } from '../api/api';
import PokemonDetails from './PokemonDetails';

vi.mock('../api/api', () => ({
  getPokemon: vi.fn(),
}));

function renderPokemonDetails(detailsId = 1, page = 1) {
  const rootRoute = createRootRoute({
    component: () => (
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
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
    vi.mocked(getPokemon).mockReturnValue(new Promise(() => {}));
    renderPokemonDetails();
    await waitFor(() => {
      expect(screen.getByLabelText('Loading')).toBeInTheDocument();
    });
  });

  test('shows pokemon details after fetch', async () => {
    vi.mocked(getPokemon).mockResolvedValue(mockPokemon);
    renderPokemonDetails();
    await waitFor(() => {
      expect(screen.getByText(mockPokemon.name)).toBeInTheDocument();
    });
  });

  test('shows error when fetch fails', async () => {
    vi.mocked(getPokemon).mockRejectedValue(
      new Error('Failed to get pokemon 1')
    );
    renderPokemonDetails();
    await waitFor(() => {
      expect(screen.getByText('Failed to get pokemon 1')).toBeInTheDocument();
    });
  });

  test('closes details when close button clicked', async () => {
    vi.mocked(getPokemon).mockResolvedValue(mockPokemon);
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
