import { Outlet, useNavigate, useParams } from '@tanstack/react-router';
import { Loader } from 'lucide-react';
import { Route as indexRoute } from '../../app/routes/index';
import {
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
import { getErrorMessage } from '../../shared/utils/getErrorMessage';

export default function HomePage() {
  const [inputValue, setInputValue] = useLocalStorage(LOCAL_STORAGE_KEY, '');
  const { page: currentPage } = indexRoute.useParams();
  const { detailsId } = useParams({ strict: false });
  const navigate = useNavigate();
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

  const pokemons = isSearching
    ? searchedPokemon
      ? [searchedPokemon]
      : []
    : (listData?.results ?? []);
  const totalPages = isSearching
    ? 0
    : Math.ceil((listData?.count ?? 0) / MAX_LIMIT);
  const isLoading = isLoadingList || isSearchLoading;

  const errorMessage = getErrorMessage(listError || searchError);

  const handleSearch = async () => {
    navigate({
      to: '/$page',
      params: { page: 1 },
    });
  };

  const handlePageChange = (newPage: number) => {
    navigate({
      to: '/$page',
      params: { page: newPage },
    });
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handelCardClick = (id: number) => {
    navigate({
      to: '/$page/$detailsId',
      params: { page: currentPage, detailsId: id },
    });
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
            <Outlet />
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
      <div className="flex justify-end">
        <ErrorTestButton />
      </div>
    </main>
  );
}
