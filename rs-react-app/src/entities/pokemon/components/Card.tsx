import Image from 'next/image';
import { useSelectedItems } from '../../../features/selectedItems/hooks/useSelectedItems';
import type { Pokemon } from '../types/types';

interface CardProps {
  pokemon: Pokemon;
  onClick: (id: number) => void;
}

export default function Card({ pokemon, onClick }: CardProps) {
  const { isSelected, handleClick } = useSelectedItems(pokemon);
  return (
    <div
      onClick={() => onClick(pokemon.id)}
      className="border border-gray-500 rounded-md p-4 flex-col items-center flex gap-1"
    >
      <div className="w-full flex justify-end">
        <input onClick={handleClick} onChange={() => {}} checked={isSelected} type="checkbox" />
      </div>
      <Image
        src={pokemon.sprites.other['official-artwork'].front_default}
        width={160}
        height={160}
        alt={pokemon.name}
        className="w-30 h-30 md:w-40 md:h-40"
      />
      <h2 className="font-bold capitalize">{pokemon.name}</h2>
      <div className="flex gap-2">
        {pokemon.types.map((type) => (
          <p
            key={type.slot}
            className="px-2 py-1 rounded-md border border-gray-500 capitalize text-sm"
          >
            {type.type.name}
          </p>
        ))}
      </div>
    </div>
  );
}
