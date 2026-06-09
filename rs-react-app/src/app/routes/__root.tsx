import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import notFoundPage from '../../pages/not-found/notFoundPage';
import ErrorBoundary from '../../shared/ui/ErrorBoundary';
import Footer from '../../widgets/Footer';
import Header from '../../widgets/Header';

function RootComponent() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen px-4 bg-background flex flex-col">
        <Header />
        <Outlet />
        <Footer />
        <TanStackRouterDevtools />
      </div>
    </ErrorBoundary>
  );
}

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    if (location.pathname === '/') {
      throw redirect({ to: '/$page', params: { page: 1 } });
    }
  },
  notFoundComponent: notFoundPage,
  component: RootComponent,
});
