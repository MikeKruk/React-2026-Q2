import { fetchPokemonByName } from '@/entities/pokemon/api/fetchPokemonByName';
import { fetchPokemonList } from '@/entities/pokemon/api/fetchPokemonList';
import HomeScreen from '@/screens/home/HomeScreen';
import { MAX_LIMIT } from '@/shared/constants/constants';
import { notFound } from 'next/navigation';

interface HomePageProps {
  params: Promise<{ page: string; locale: string; detailsId: string }>;
}

export default async function HomePageWithDetails({ params }: HomePageProps) {
  const { page, detailsId } = await params;

  if (Number.isNaN(Number(detailsId)) || Number(detailsId) < 1) notFound();

  const offset = (Number(page) - 1) * MAX_LIMIT;
  const [initialData, initialDetails] = await Promise.all([
    fetchPokemonList(MAX_LIMIT, offset),
    fetchPokemonByName(detailsId),
  ]);
  return (
    <HomeScreen
      page={Number(page)}
      detailsId={detailsId}
      initialData={initialData}
      initialDetails={initialDetails}
    />
  );
}
