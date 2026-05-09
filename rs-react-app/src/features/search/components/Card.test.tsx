import { render, screen } from '@testing-library/react';
import Card from './Card';

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  types: [
    {
      slot: 1,
      type: {
        name: 'grass',
        url: '"https://pokeapi.co/api/v2/type/12/"',
      },
    },
    {
      slot: 2,
      type: {
        name: 'poison',
        url: 'https://pokeapi.co/api/v2/type/4/',
      },
    },
  ],
  sprites: {
    other: {
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      },
    },
  },
};

describe('Card', () => {
  test('renders pokemon name', () => {
    render(<Card pokemon={mockPokemon} />);

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  test('render pokemon image with correct src and alt', () => {
    render(<Card pokemon={mockPokemon} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', mockPokemon.sprites.other['official-artwork'].front_default);
    expect(img).toHaveAttribute('alt', mockPokemon.name);
  })

  test('render pokemon types', () => {
    render(<Card pokemon={mockPokemon} />);

    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument()
    
  })
});
