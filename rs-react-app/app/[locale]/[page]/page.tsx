import { fetchPokemonList } from '@/entities/pokemon/api/fetchPokemonList';
import HomeScreen from '@/screens/home/HomeScreen';
import { MAX_LIMIT } from '@/shared/constants/constants';

interface HomePageProps {
  params: Promise<{ page: string; locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { page } = await params;
  const offset = (Number(page) - 1) * MAX_LIMIT;
  const initialData = await fetchPokemonList(MAX_LIMIT, offset);
  return <HomeScreen page={Number(page)} initialData={initialData} />;
}
