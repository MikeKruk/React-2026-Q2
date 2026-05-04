import { Component } from 'react';


import { api } from './features/search/api/api';
import CardList from './features/search/components/CardList';
import SearchSection from './features/search/components/SearchSection';
import Footer from './layout/Footer';
import Header from './layout/Header';
import { LOCAL_STORAGE_KEY } from './shared/constants/constants';
import type { Pokemon, PokemonListItem } from './shared/types/types';
import { Loader } from 'lucide-react';

interface State {
  pokemons: Pokemon[];
  currentTerm: string;
  inputValue: string | null;
  isLoading: boolean;
}

export default class App extends Component<object, State> {
  state: State = {
    pokemons: [],
    currentTerm: null,
    inputValue: localStorage.getItem(LOCAL_STORAGE_KEY) ?? '',
    isLoading: false,
  };
  async componentDidMount(): Promise<void> {
    await this.fetchPokemons(this.state.inputValue);
  }

  fetchPokemons = async (term: string) => {
    if (term === this.state.currentTerm) return;
    this.setState({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      if (term === '') {
        const { results }: { results: PokemonListItem[] } =
          await api.getPokemonList();
        const pokemons: Pokemon[] = await Promise.all(
          results.map((pokemon) => api.getPokemonByName(pokemon.name))
        );
        this.setState({
          pokemons,
          currentTerm: term,
        });
      } else {
        const pokemon = await api.getPokemonByName(term);
        this.setState({
          pokemons: [pokemon],
          currentTerm: term,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handelSearch = () => {
    const term = this.state.inputValue.trim();
    localStorage.setItem(LOCAL_STORAGE_KEY, term);
    this.fetchPokemons(term);
  };

  handelInputChange = (value: string) => {
    this.setState({ inputValue: value });
  };
  render() {
    const { isLoading, inputValue, pokemons } = this.state;
    return (
      <div className="min-h-screen px-4 bg-background flex flex-col">
        <Header />
        <main className="flex-1 my-4 flex flex-col gap-8">
          <SearchSection
            onSearch={this.handelSearch}
            onChange={this.handelInputChange}
            value={inputValue}
          />
          {isLoading ? (
            <div className="flex-1 flex justify-center items-center">
              <Loader className="animate-spin" />
            </div>
          ) : (
            <CardList pokemons={pokemons} />
          )}
        </main>
        <Footer />
      </div>
    );
  }
}
