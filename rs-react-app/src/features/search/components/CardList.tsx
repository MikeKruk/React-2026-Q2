import Card from '../../../entities/pokemon/components/Card';
import type { Pokemon } from '../../../entities/pokemon/types/types';

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
