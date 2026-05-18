import type { Pokemon } from '../../../shared/types/types';
import Card from './Card';

interface CardListProps {
  pokemons: Pokemon[];
  onClick: (id: number) => void;
  isDetailOpen: boolean;
}

export default function CardList({
  pokemons,
  onClick,
  isDetailOpen,
}: CardListProps) {
  return (
    <section
      className={`grid gap-4 ${
        isDetailOpen
          ? 'grid-cols-1 md:grid-cols-3 lg:grid-cols-4'
          : 'grid-cols-2 md:grid-cols-4'
      }`}
    >
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          pokemon={pokemon}
          onClick={() => onClick(pokemon.id)}
        />
      ))}
    </section>
  );
}
