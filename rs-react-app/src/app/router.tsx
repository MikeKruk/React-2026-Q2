import { createRouter } from '@tanstack/react-router';
import { Route as aboutRoute } from './routes/about';
import { Route as detailRoute } from './routes/detail';
import { Route as indexRoute } from './routes/index';
import { Route as notFoundRoute } from './routes/notFound';
import { Route as rootRoute } from './routes/__root';

const routeTree = rootRoute.addChildren([
  indexRoute.addChildren([detailRoute]),
  aboutRoute,
  notFoundRoute,
]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
