import { createRoute } from '@tanstack/react-router';
import { Route as rootRoute } from './__root';

function About() {
  return <div>About</div>;
}

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});
