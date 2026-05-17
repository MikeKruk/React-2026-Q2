import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';

function NotFound() {
  return <div>404</div>;
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFound,
});
