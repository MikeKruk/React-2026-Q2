import { Outlet, useNavigate, useParams } from '@tanstack/react-router';
import { Loader } from 'lucide-react';
import { useState } from 'react';
import { Route as indexRoute } from '../../app/routes/index';
import { useAppDispatch } from '../../app/store/hooks';
import {
  pokemonApi,
  useGetPokemonListQuery,
  useGetPokemonQuery,
} from '../../entities/pokemon/api/pokemonApi';
import SubmissionCard from '../../features/forms/components/SubmissionCard';
import type { FormSubmission } from '../../features/forms/store/formsSlice';
import CardList from '../../features/search/components/CardList';
import Pagination from '../../features/search/components/Pagination';
import SearchErrorState from '../../features/search/components/SearchErrorState';
import SearchSection from '../../features/search/components/SearchSection';
import SelectedItemsFlyout from '../../features/selectedItems/components/SelectedItemsFlyout';
import { useSelectedItemsCount } from '../../features/selectedItems/hooks/useSelectedItemsCount';
import { LOCAL_STORAGE_KEY, MAX_LIMIT } from '../../shared/constants/constants';
import { useLocalStorage } from '../../shared/hooks/useLocalStorage';
import ErrorTestButton from '../../shared/ui/ErrorTestButton';
import Modal from '../../shared/ui/Modal';
import RefreshButton from '../../shared/ui/RefreshButton';
import { getErrorMessage } from '../../shared/utils/getErrorMessage';

export default function HomePage() {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useLocalStorage(LOCAL_STORAGE_KEY, '');
  const { page: currentPage } = indexRoute.useParams();
  const { detailsId } = useParams({ strict: false });
  const navigate = useNavigate();
  const offset = (currentPage - 1) * MAX_LIMIT;
  const selectedItemsCount = useSelectedItemsCount();
  const isSearching = inputValue.trim() !== '';
  const [isModalClose, setIsModalClose] = useState(false);
  // const submissions = useAppSelector((state) => state.forms.submissions);

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
      <button onClick={() => setIsModalClose(true)}>Open Form</button>
      <Modal
        title="Modal"
        onClose={() => setIsModalClose(false)}
        isOpen={isModalClose}
      >
        <h1>Modal</h1>
      </Modal>
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
      <div className="flex justify-between">
        <RefreshButton onClick={handelRefresh} isText={true} />
        <ErrorTestButton />
      </div>
      {test.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {test.map((submission) => (
            <SubmissionCard key={submission.id} submission={submission} />
          ))}
        </div>
      )}
    </main>
  );
}

const test: FormSubmission[] = [
  {
    id: '1',
    formType: 'uncontrolled',
    createdAt: 1710000000000,
    values: {
      name: 'Alex Johnson',
      email: 'alex@example.com',
      age: '28',
    },
    isNew: true,
  },
  {
    id: '2',
    formType: 'react-hook-form',
    createdAt: 1710001000000,
    values: {
      name: 'Maria Ivanova',
      country: 'Poland',
    },
  },
  {
    id: '3',
    formType: 'react-hook-form',
    createdAt: 1710002000000,
    values: {
      title: 'Pokemon Search',
      query: 'pikachu',
      resultsCount: '12',
    },
  },
];
