import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPokemonByName, getPokemonList } from '../features/search/api/api';
import CardList from '../features/search/components/CardList';
import SearchErrorState from '../features/search/components/SearchErrorState';
import SearchSection from '../features/search/components/SearchSection';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import ErrorTestButton from '../shared/components/ErrorTestButton';
import { LOCAL_STORAGE_KEY } from '../shared/constants/constants';
import type { Pokemon, PokemonListItem } from '../shared/types/types';

export default function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [lastSearchTerm, setLastSearchTerm] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>(
    () => localStorage.getItem(LOCAL_STORAGE_KEY) ?? ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      await fetchPokemons(inputValue.trim());
    }
    fetch();
  }, []);

  async function fetchPokemons(term: string) {
    setIsLoading(true);
    setError(null);
    try {
      if (term === '') {
        const { results }: { results: PokemonListItem[] } =
          await getPokemonList();
        const pokemons: Pokemon[] = await Promise.all(
          results.map((pokemon) => getPokemonByName(pokemon.name))
        );

        setPokemons(pokemons);
        setLastSearchTerm('');
      } else {
        const pokemon = await getPokemonByName(term);

        setPokemons([pokemon]);
        setLastSearchTerm(term);
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

    localStorage.setItem(LOCAL_STORAGE_KEY, term);
    await fetchPokemons(term);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <div className="min-h-screen px-4 bg-background flex flex-col">
      <Header />
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
        <div className="flex justify-end">
          <ErrorTestButton />
        </div>
      </main>
      <Footer />
    </div>
  );
}
