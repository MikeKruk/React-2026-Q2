import { createRoute, notFound } from '@tanstack/react-router';
import PokemonDetails from '../../features/search/components/PokemonDetails';
import { Route as indexRoute } from './index';

export const Route = createRoute({
  getParentRoute: () => indexRoute,
  path: '$detailsId',
  component: PokemonDetails,
  parseParams: ({ detailsId }) => ({ detailsId: Number(detailsId) }),
  stringifyParams: ({ detailsId }) => ({ detailsId: String(detailsId) }),
  beforeLoad: ({ params: { detailsId } }) => {
    if (isNaN(detailsId) || detailsId < 1) {
      throw notFound();
    }
  },
});
