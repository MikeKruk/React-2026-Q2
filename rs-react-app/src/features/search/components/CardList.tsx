import type { Pokemon } from '../../../shared/types/types';
import Card from './Card';

interface CardListProps {
  pokemons: Pokemon[];
}

export default function CardList({ pokemons }: CardListProps) {
  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {pokemons.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} />
      ))}
    </section>
  );
}
