'use client';
import PokemonDetails from '@/entities/pokemon/components/PokemonDetails';
import { Pokemon } from '@/entities/pokemon/types/types';
import { useRouter } from '@/i18n/navigation';
import CardList from '../../features/search/components/CardList';
import Pagination from '../../features/search/components/Pagination';
import SearchSection from '../../features/search/components/SearchSection';
import SelectedItemsFlyout from '../../features/selectedItems/components/SelectedItemsFlyout';
import { useSelectedItemsCount } from '../../features/selectedItems/hooks/useSelectedItemsCount';
import { LOCAL_STORAGE_KEY, MAX_LIMIT } from '../../shared/constants/constants';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import ErrorTestButton from '../../shared/ui/ErrorTestButton';

interface HomeScreenProps {
  page: number;
  searchAction: (formData: FormData) => void;
  detailsId?: string;
  initialData?: { results: Pokemon[]; count: number };
  initialDetails?: Pokemon;
}

export default function HomeScreen({
  page: currentPage,
  searchAction,
  detailsId,
  initialData,
  initialDetails,
}: HomeScreenProps) {
  const [inputValue, setInputValue] = useLocalStorage(LOCAL_STORAGE_KEY, '');
  const router = useRouter();
  const selectedItemsCount = useSelectedItemsCount();

  const pokemons = initialData?.results ?? [];
  const totalPages = Math.ceil((initialData?.count ?? 0) / MAX_LIMIT);

  const handlePageChange = (newPage: number) => {
    router.push(`/${newPage}`);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handelCardClick = (id: number) => {
    router.push(`/${currentPage}/${id}`);
  };

  return (
    <main
      className={`flex-1 my-4 flex flex-col gap-8 ${selectedItemsCount ? 'pb-20 md:pb-0' : ''}`}
    >
      <SearchSection
        value={inputValue}
        onChange={handleInputChange}
        searchAction={searchAction}
      />
      <div className="flex gap-4 items-start">
        <div className={detailsId ? 'w-1/2 md:flex-1' : 'w-full'}>
          <CardList
            pokemons={pokemons}
            onClick={handelCardClick}
            isDetailOpen={!!detailsId}
          />
        </div>
        {detailsId && (
          <div className="w-1/2 md:w-1/3 sticky top-4">
            <PokemonDetails pokemon={initialDetails} page={currentPage} />
          </div>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <SelectedItemsFlyout />
      <div className="flex justify-between">
        <ErrorTestButton />
      </div>
    </main>
  );
}
