import { Component } from 'react';

import { Loader } from 'lucide-react';
import { api } from '../features/search/api/api';
import CardList from '../features/search/components/CardList';
import SearchErrorState from '../features/search/components/SearchErrorState';
import SearchSection from '../features/search/components/SearchSection';
import Footer from '../layout/Footer';
import Header from '../layout/Header';
import ErrorTestButton from '../shared/components/ErrorTestButton';
import { LOCAL_STORAGE_KEY } from '../shared/constants/constants';
import type { Pokemon, PokemonListItem } from '../shared/types/types';

interface State {
  pokemons: Pokemon[];
  lastSearchTerm: string | null;
  inputValue: string;
  isLoading: boolean;
  error: string | null;
}

export default class App extends Component<object, State> {
  state: State = {
    pokemons: [],
    lastSearchTerm: null,
    inputValue: localStorage.getItem(LOCAL_STORAGE_KEY) ?? '',
    isLoading: false,
    error: null,
  };
  async componentDidMount(): Promise<void> {
    await this.fetchPokemons(this.state.inputValue);
  }

  fetchPokemons = async (term: string) => {
    const normalizedTerm = term.trim();
    this.setState({ isLoading: true, error: null });
    try {
      if (normalizedTerm === '') {
        const { results }: { results: PokemonListItem[] } =
          await api.getPokemonList();
        const pokemons: Pokemon[] = await Promise.all(
          results.map((pokemon) => api.getPokemonByName(pokemon.name))
        );
        this.setState({
          pokemons,
          lastSearchTerm: '',
        });
      } else {
        const pokemon = await api.getPokemonByName(normalizedTerm);
        this.setState({
          pokemons: [pokemon],
          lastSearchTerm: normalizedTerm,
        });
      }
    } catch (error: unknown) {
      this.setState({
        error: error instanceof Error ? error.message : 'Something went wrong',
        lastSearchTerm: null,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearch = () => {
    const term = this.state.inputValue.trim();

    if (term === this.state.lastSearchTerm) return;

    localStorage.setItem(LOCAL_STORAGE_KEY, term);
    this.fetchPokemons(term);
  };

  handleInputChange = (value: string) => {
    this.setState({ inputValue: value });
  };
  render() {
    const { isLoading, inputValue, pokemons, error } = this.state;
    return (
      <div className="min-h-screen px-4 bg-background flex flex-col">
        <Header />
        <main className="flex-1 my-4 flex flex-col gap-8">
          <SearchSection
            onSearch={this.handleSearch}
            onChange={this.handleInputChange}
            value={inputValue}
          />
          {error ? (
            <SearchErrorState message={error} onRetry={this.handleSearch} />
          ) : isLoading ? (
            <div className="flex-1 flex justify-center items-center">
              <Loader className="animate-spin" />
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
}
