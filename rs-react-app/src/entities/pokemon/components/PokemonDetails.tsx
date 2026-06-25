'use client';
import { useRouter } from '@/i18n/navigation';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useTheme } from '../../../app/context/hooks/useTheme';
import { Pokemon } from '../types/types';

interface PokemonDetailsProps {
  pokemon?: Pokemon;
  page: number;
}

export default function PokemonDetails({ pokemon, page }: PokemonDetailsProps) {
  const t = useTranslations('home');
  const router = useRouter();

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const hoverClass = isDark
    ? 'hover:bg-violet-400/20 hover:border-violet-400 active:bg-violet-400/20 active:border-violet-400'
    : 'hover:bg-orange-400/70 hover:border-orange-400 active:bg-orange-400/70 active:border-orange-400';

  if (!pokemon) return null;

  const handleClose = () => {
    router.push(`/${page}`);
  };

  return (
    <div className="border border-gray-500 rounded-md p-4 flex flex-col gap-4">
      <div className="flex justify-between">
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
        src={pokemon.sprites.other['official-artwork'].front_default}
        width={160}
        height={160}
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
        <p>
          {t('height')}: {pokemon.height}
        </p>
        <p>
          {t('weight')}: {pokemon.weight / 10}kg
        </p>
        <p>
          {t('baseExperience')}: {pokemon.base_experience}
        </p>
      </div>
    </div>
  );
}
