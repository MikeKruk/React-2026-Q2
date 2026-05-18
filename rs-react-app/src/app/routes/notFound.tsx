import { createRoute } from '@tanstack/react-router';
import notFoundPage from '../../pages/notFoundPage';
import { Route as rootRoute } from './__root';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: notFoundPage,
});
