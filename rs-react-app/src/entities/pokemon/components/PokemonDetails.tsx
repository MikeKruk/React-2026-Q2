'use client';
import { useRouter } from '@/i18n/navigation';
import { Loader, X } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTheme } from '../../../app/context/hooks/useTheme';
import { useAppDispatch } from '../../../app/store/hooks';
import RefreshButton from '../../../shared/ui/RefreshButton';
import { getErrorMessage } from '../../../shared/utils/getErrorMessage';
import { pokemonApi, useGetPokemonQuery } from '../api/pokemonApi';
import { Pokemon } from '../types/types';

interface PokemonDetailsProps {
  initialDetails?: Pokemon;
}

export default function PokemonDetails({
  initialDetails,
}: PokemonDetailsProps) {
  const dispatch = useAppDispatch();
  const params = useParams();
  const router = useRouter();
  const page = params.page;
  const detailsId = params.detailsId as string;
  const { data: pokemon, isLoading, error } = useGetPokemonQuery(detailsId);
  const hybridPokemon = pokemon ?? initialDetails;
  const errorMessage = getErrorMessage(error);

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const hoverClass = isDark
    ? 'hover:bg-violet-400/20 hover:border-violet-400 active:bg-violet-400/20 active:border-violet-400'
    : 'hover:bg-orange-400/70 hover:border-orange-400 active:bg-orange-400/70 active:border-orange-400';

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader className="animate-spin" aria-label="Loading" />
      </div>
    );
  }

  if (error) {
    return <div>{errorMessage}</div>;
  }

  if (!hybridPokemon) return null;

  const handleClose = () => {
    router.push(`/${page}`);
  };

  const handelRefresh = () => {
    dispatch(
      pokemonApi.util.invalidateTags([{ type: 'Pokemon', id: detailsId }])
    );
  };

  return (
    <div className="border border-gray-500 rounded-md p-4 flex flex-col gap-4">
      <div className="flex justify-between">
        <RefreshButton onClick={handelRefresh} isText={false} />
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
      <Image
        src={hybridPokemon.sprites.other['official-artwork'].front_default}
        width={160}
        height={160}
        alt={hybridPokemon.name}
        className="w-30 h-30 md:w-40 md:h-40 mx-auto"
      />
      <h2 className="font-bold capitalize text-center text-xl">
        {hybridPokemon.name}
      </h2>
      <div className="flex gap-2 justify-center">
        {hybridPokemon.types.map((type) => (
          <span
            key={type.slot}
            className="px-2 py-1 rounded-md border border-gray-500 capitalize text-sm"
          >
            {type.type.name}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-2 text-sm">
        <p>Height: {hybridPokemon.height}</p>
        <p>Weight: {hybridPokemon.weight / 10}kg</p>
        <p>Base experience: {hybridPokemon.base_experience}</p>
      </div>
    </div>
  );
}
