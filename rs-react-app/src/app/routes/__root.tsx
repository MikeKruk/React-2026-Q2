import { createRootRoute, Outlet, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import Footer from '../../layout/Footer';
import Header from '../../layout/Header';
import ErrorBoundary from '../../shared/components/ErrorBoundary';

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
  component: RootComponent,
});
