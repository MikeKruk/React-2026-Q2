import { Component } from 'react';
import Card from './Card';
import type { Pokemon } from '../../../shared/types/types';

interface CardListProps {
  pokemons: Pokemon[]
}

export default class CardList extends Component<CardListProps> {
  render() {
    const { pokemons } = this.props;
    return (
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </section>
    );
  }
}
