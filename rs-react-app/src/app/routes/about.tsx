import { createRoute } from '@tanstack/react-router';
import AboutPage from '../../pages/about/AboutPage';
import { Route as rootRoute } from './__root';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});
