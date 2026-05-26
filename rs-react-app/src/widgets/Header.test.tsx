import {
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../app/context/ThemeContext';
import { store } from '../app/store/store';
import Header from './Header';

function renderHeader() {
  const rootRoute = createRootRoute({
    component: () =>(
      <Provider store={store}>
        <ThemeProvider>
        <Header />
        </ThemeProvider>
      </Provider>
    )
  });
  const router = createRouter({
    routeTree: rootRoute,
  });

  return render(<RouterProvider router={router} />);
}

describe('Header', () => {
  test('renders header title', async () => {
    renderHeader();

    await waitFor(async () => {
      const title = screen.getByRole('heading', { level: 1 });

      expect(title).toBeInTheDocument();
    });
  });

  test('renders correct title text', async () => {
    renderHeader();

    await waitFor(() => {
      const title = screen.getByRole('heading', { level: 1 });

      expect(title).toHaveTextContent('Pokémon Explorer');
    });
  });
});
