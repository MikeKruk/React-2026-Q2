import { createRoute, notFound } from '@tanstack/react-router';

import { Route as rootRoute } from './__root';
import HomePage from '../../pages/home/HomePage';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '$page',
  component: HomePage,
  parseParams: ({ page }) => ({ page: Number(page) }),
  stringifyParams: ({ page }) => ({ page: String(page) }),
  beforeLoad: ({ params: { page } }) => {
    if (isNaN(page) || page < 1) {
      throw notFound();
    }
  },
});
