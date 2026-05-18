import { createRoute } from '@tanstack/react-router';
import App from '../App';
import { Route as rootRoute } from './__root';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '$page',
  component: App,
  parseParams: ({ page }) => ({ page: Number(page) }),
  stringifyParams: ({ page }) => ({ page: String(page) }),
});
