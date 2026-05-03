import { Component } from 'react';
import type { Pokemon, PokemonListItem } from '../../../shared/types/types';
import { api } from '../api/api';
import Card from './Card';

interface State {
  pokemons: Pokemon[];
}

export default class CardList extends Component<object, State> {
  state: State = {
    pokemons: [],
  };
  async componentDidMount(): Promise<void> {
    const { results }: { results: PokemonListItem[] } =
      await api.getPokemonList();
    const pokemons: Pokemon[] = await Promise.all(
      results.map((pokemon) => api.getPokemonByName(pokemon.name))
    );

    this.setState({
      pokemons,
    });
  }

  render() {
    return (
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {this.state.pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
    );
  }
}