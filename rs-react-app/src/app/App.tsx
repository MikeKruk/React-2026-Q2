import { Outlet, useNavigate, useParams } from '@tanstack/react-router';
import { Loader } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { getPokemon, getPokemonList } from '../features/search/api/api';
import CardList from '../features/search/components/CardList';
import Pagination from '../features/search/components/Pagination';
import SearchErrorState from '../features/search/components/SearchErrorState';
import SearchSection from '../features/search/components/SearchSection';
import ErrorTestButton from '../shared/components/ErrorTestButton';
import { LOCAL_STORAGE_KEY, MAX_LIMIT } from '../shared/constants/constants';
import { useLocalStorage } from '../shared/hooks/useLocalStorage';
import type { Pokemon, PokemonListItem } from '../shared/types/types';
import { Route as indexRoute } from './routes/index';

export default function App() {
  const isFirstRender = useRef(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [lastSearchTerm, setLastSearchTerm] = useState<string | null>(null);
  const [inputValue, setInputValue] = useLocalStorage(LOCAL_STORAGE_KEY, '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const { page: currentPage } = indexRoute.useParams();
  const { detailsId } = useParams({ strict: false });
  const navigate = useNavigate();
  const totalPages = Math.ceil(totalCount / MAX_LIMIT);

  useEffect(() => {
    async function fetch() {
      await fetchPokemons(inputValue.trim(), currentPage);
    }

    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetch();
      return;
    }

    if (inputValue.trim() !== '') return;
    fetch();
  }, [currentPage]);

  async function fetchPokemons(term: string, currentPage: number) {
    setIsLoading(true);
    setError(null);
    try {
      if (term === '') {
        const offset = (currentPage - 1) * MAX_LIMIT;
        const {
          results,
          count,
        }: { results: PokemonListItem[]; count: number } = await getPokemonList(
          MAX_LIMIT,
          offset
        );
        setTotalCount(count);
        const pokemons: Pokemon[] = await Promise.all(
          results.map((pokemon) => getPokemon(pokemon.name))
        );

        setPokemons(pokemons);
        setLastSearchTerm('');
      } else {
        const pokemon = await getPokemon(term);

        setPokemons([pokemon]);
        setLastSearchTerm(term);
        setTotalCount(1);
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
      setLastSearchTerm(null);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = async () => {
    const term = inputValue.trim();

    if (term === lastSearchTerm) return;
    navigate({
      to: '/$page',
      params: { page: 1 },
    });
    await fetchPokemons(term, 1);
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
    <main className="flex-1 my-4 flex flex-col gap-8">
      <SearchSection
        onSearch={handleSearch}
        onChange={handleInputChange}
        value={inputValue}
      />
      <div className="flex gap-4 items-start">
        <div className={detailsId ? 'w-1/2 md:flex-1' : 'w-full'}>
          {error ? (
            <SearchErrorState message={error} onRetry={handleSearch} />
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
      {!error && !isLoading && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <div className="flex justify-end">
        <ErrorTestButton />
      </div>
    </main>
  );
}
