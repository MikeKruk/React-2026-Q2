import { createRouter } from '@tanstack/react-router';
import { Route as aboutRoute } from '../app/routes/about';
import { Route as indexRoute } from '../app/routes/index';
import { Route as notFoundRoute } from '../app/routes/notFound';
import { Route as rootRoute } from '../app/routes/root';

const routeTree = rootRoute.addChildren([
  indexRoute,
  aboutRoute,
  notFoundRoute,
]);

export const router = createRouter({ routeTree });
