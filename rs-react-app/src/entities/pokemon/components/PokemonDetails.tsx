import { useNavigate } from '@tanstack/react-router';
import { Loader, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from '../../../app/context/hooks/useTheme';
import { Route as detailsRoute } from '../../../app/routes/detail';
import { getPokemon } from '../api/api';
import type { Pokemon } from '../types/types';

export default function PokemonDetails() {
  const { page, detailsId } = detailsRoute.useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const hoverClass = isDark
    ? 'hover:bg-violet-400/20 hover:border-violet-400 active:bg-violet-400/20 active:border-violet-400'
    : 'hover:bg-orange-400/70 hover:border-orange-400 active:bg-orange-400/70 active:border-orange-400';

  useEffect(() => {
    async function fetch() {
      if (!detailsId) return;
      setIsLoading(true);
      setError(null);
      try {
        const pokemon = await getPokemon(detailsId);
        setPokemon(pokemon);
      } catch (error: unknown) {
        setError(
          error instanceof Error ? error.message : 'Something went wrong'
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetch();
  }, [detailsId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader className="animate-spin" aria-label="Loading" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!pokemon) return null;

  const handleClose = () => {
    navigate({
      to: '/$page',
      params: { page },
    });
  };

  return (
    <div className="border border-gray-500 rounded-md p-4 flex flex-col gap-4">
      <div className="flex justify-end">
        <button
          aria-label="Close details"
          onClick={handleClose}
          className={`
            p-1 rounded-md border border-border transition-colors
            ${hoverClass}  
          `}
        >
          <X className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>
      <img
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
        className="w-30 h-30 md:w-40 md:h-40 mx-auto"
      />
      <h2 className="font-bold capitalize text-center text-xl">
        {pokemon.name}
      </h2>
      <div className="flex gap-2 justify-center">
        {pokemon.types.map((type) => (
          <span
            key={type.slot}
            className="px-2 py-1 rounded-md border border-gray-500 capitalize text-sm"
          >
            {type.type.name}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <p>Height: {pokemon.height}</p>
        <p>Weight: {pokemon.weight / 10}kg</p>
        <p>Base experience: {pokemon.base_experience}</p>
      </div>
    </div>
  );
}
