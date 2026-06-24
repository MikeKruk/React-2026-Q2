'use client';
import PokemonDetails from '@/entities/pokemon/components/PokemonDetails';
import { Pokemon } from '@/entities/pokemon/types/types';
import { useRouter } from '@/i18n/navigation';
import { Loader } from 'lucide-react';
import { useAppDispatch } from '../../app/store/hooks';
import {
  pokemonApi,
  useGetPokemonListQuery,
  useGetPokemonQuery,
} from '../../entities/pokemon/api/pokemonApi';
import CardList from '../../features/search/components/CardList';
import Pagination from '../../features/search/components/Pagination';
import SearchErrorState from '../../features/search/components/SearchErrorState';
import SearchSection from '../../features/search/components/SearchSection';
import SelectedItemsFlyout from '../../features/selectedItems/components/SelectedItemsFlyout';
import { useSelectedItemsCount } from '../../features/selectedItems/hooks/useSelectedItemsCount';
import { LOCAL_STORAGE_KEY, MAX_LIMIT } from '../../shared/constants/constants';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import ErrorTestButton from '../../shared/ui/ErrorTestButton';
import RefreshButton from '../../shared/ui/RefreshButton';
import { getErrorMessage } from '../../shared/utils/getErrorMessage';

interface HomeScreenProps {
  page: number;
  detailsId?: string;
  initialData?: { results: Pokemon[]; count: number };
  initialDetails?: Pokemon;
}

export default function HomeScreen({
  page: currentPage,
  detailsId,
  initialData,
  initialDetails,
}: HomeScreenProps) {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useLocalStorage(LOCAL_STORAGE_KEY, '');
  const router = useRouter();
  const offset = (currentPage - 1) * MAX_LIMIT;
  const selectedItemsCount = useSelectedItemsCount();
  const isSearching = inputValue.trim() !== '';

  const {
    data: listData,
    isLoading: isLoadingList,
    error: listError,
  } = useGetPokemonListQuery(
    { limit: MAX_LIMIT, offset },
    { skip: isSearching }
  );
  const {
    data: searchedPokemon,
    isLoading: isSearchLoading,
    error: searchError,
  } = useGetPokemonQuery(inputValue.trim(), { skip: !isSearching });

  const hybridListData = listData ?? initialData;

  const pokemons = isSearching
    ? searchedPokemon
      ? [searchedPokemon]
      : []
    : (hybridListData?.results ?? []);
  const totalPages = isSearching
    ? 0
    : Math.ceil((hybridListData?.count ?? 0) / MAX_LIMIT);
  const isLoading = isLoadingList || isSearchLoading;

  const errorMessage = getErrorMessage(listError || searchError);

  const handleSearch = async () => {
    router.push('/1');
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/${newPage}`);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handelCardClick = (id: number) => {
    router.push(`/${currentPage}/${id}`);
  };

  const handelRefresh = () => {
    dispatch(pokemonApi.util.invalidateTags(['PokemonList']));
  };

  return (
    <main
      className={`flex-1 my-4 flex flex-col gap-8 ${selectedItemsCount ? 'pb-20 md:pb-0' : ''}`}
    >
      <SearchSection
        onSearch={handleSearch}
        onChange={handleInputChange}
        value={inputValue}
      />
      <div className="flex gap-4 items-start">
        <div className={detailsId ? 'w-1/2 md:flex-1' : 'w-full'}>
          {errorMessage ? (
            <SearchErrorState message={errorMessage} onRetry={handleSearch} />
          ) : isLoading ? (
            <div className="flex-1 flex justify-center items-center">
              <Loader className="animate-spin" aria-label="Loading" />
            </div>
          ) : (
            <CardList
              pokemons={pokemons}
              onClick={handelCardClick}
              isDetailOpen={!!detailsId}
            />
          )}
        </div>
        {detailsId && (
          <div className="w-1/2 md:w-1/3 sticky top-4">
            <PokemonDetails initialDetails={initialDetails} />
          </div>
        )}
      </div>
      {!errorMessage && !isLoading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <SelectedItemsFlyout />
      <div className="flex justify-between">
        <RefreshButton onClick={handelRefresh} isText={true} />
        <ErrorTestButton />
      </div>
    </main>
  );
}
