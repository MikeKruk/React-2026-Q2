import { Component } from 'react';
import type { Pokemon } from '../../../shared/types/types';

interface CardProps {
  pokemon: Pokemon;
}

export default class Card extends Component<CardProps> {
  render() {
    const { pokemon } = this.props;
    return (
      <div className="border border-gray-500 rounded-md p-4 flex flex-col items-center">
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
          className='w-30 h-30'
        />
        <h2 className='font-bold capitalize'>{pokemon.name}</h2>
        <div className="flex gap-2">
          {pokemon.types.map((type) => (
            <p key={type.slot}>{type.type.name}</p>
          ))}
        </div>
      </div>
    );
  }
}
