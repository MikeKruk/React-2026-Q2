import {
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import { render, screen } from '@testing-library/react';
import notFoundPage from './notFoundPage';

function renderNotFoundPage() {
  const rootRoute = createRootRoute({ component: notFoundPage });
  const pageRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '$page',
    component: () => null,
  });
  const router = createRouter({
    routeTree: rootRoute.addChildren([pageRoute]),
  });
  return render(<RouterProvider router={router} />);
}

describe('NotFoundPage', () => {
  test('renders 404 heading', async () => {
    renderNotFoundPage();
    expect(await screen.findByText('404')).toBeInTheDocument();
  });

  test('renders page not found message', async () => {
    renderNotFoundPage();
    expect(await screen.findByText('Page not found')).toBeInTheDocument();
  });

  test('renders back to home link', async () => {
    renderNotFoundPage();
    expect(await screen.findByText('Back to Home')).toBeInTheDocument();
  });
});
