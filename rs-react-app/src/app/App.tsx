import { useNavigate } from '@tanstack/react-router';
import { Loader } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Route as indexRoute } from '../app/routes/index';
import { getPokemonByName, getPokemonList } from '../features/search/api/api';
import CardList from '../features/search/components/CardList';
import Pagination from '../features/search/components/Pagination';
import SearchErrorState from '../features/search/components/SearchErrorState';
import SearchSection from '../features/search/components/SearchSection';
import ErrorTestButton from '../shared/components/ErrorTestButton';
import { LOCAL_STORAGE_KEY, MAX_LIMIT } from '../shared/constants/constants';
import { useLocalStorage } from '../shared/hooks/useLocalStorage';
import type { Pokemon, PokemonListItem } from '../shared/types/types';

export default function App() {
  const isFirstRender = useRef(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [lastSearchTerm, setLastSearchTerm] = useState<string | null>(null);
  const [inputValue, setInputValue] = useLocalStorage(LOCAL_STORAGE_KEY, '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const { page: currentPage } = indexRoute.useSearch();
  const navigate = useNavigate();
  const totalPages = Math.ceil(totalCount / MAX_LIMIT);

  useEffect(() => {
    async function fetch() {
      await fetchPokemons(inputValue.trim(), currentPage);
    }

    if(isFirstRender.current) {
      isFirstRender.current = false;
      fetch();
      return
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
          results.map((pokemon) => getPokemonByName(pokemon.name))
        );

        setPokemons(pokemons);
        setLastSearchTerm('');
      } else {
        const pokemon = await getPokemonByName(term);

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
      to: '/',
      search: { page: 1 },
    });
    await fetchPokemons(term, 1);
  };

  const handlePageChange = (newPage: number) => {
    navigate({
      to: '/',
      search: { page: newPage },
    });
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <main className="flex-1 my-4 flex flex-col gap-8">
      <SearchSection
        onSearch={handleSearch}
        onChange={handleInputChange}
        value={inputValue}
      />
      {error ? (
        <SearchErrorState message={error} onRetry={handleSearch} />
      ) : isLoading ? (
        <div className="flex-1 flex justify-center items-center">
          <Loader className="animate-spin" aria-label="Loading" />
        </div>
      ) : (
        <CardList pokemons={pokemons} />
      )}
      <div className="flex flex-col gap-4">
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
      </div>
    </main>
  );
}
