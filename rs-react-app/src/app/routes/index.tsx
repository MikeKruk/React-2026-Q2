import { createRoute } from '@tanstack/react-router';
import App from '../App';
import { Route as rootRoute } from './__root';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: Number(search.page ?? 1),
    };
  },
  component: App,
});
