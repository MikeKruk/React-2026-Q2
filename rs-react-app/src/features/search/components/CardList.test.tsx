import { render, screen } from '@testing-library/react';
import {
  mockPokemon,
  mockPokemon2,
} from '../../../test-utils/mocks/mockPokemon';
import CardList from './CardList';

const arrPokemons = [mockPokemon, mockPokemon2];

describe('CardList', () => {
  test('renders correct number of cards', () => {
    render(<CardList pokemons={arrPokemons} />);

    const imgs = screen.getAllByRole('img');

    expect(imgs).toHaveLength(2);
  });

  test('renders description of pokemon', () => {
    render(<CardList pokemons={arrPokemons} />);

    const name1 = screen.getByText('bulbasaur');
    const name2 = screen.getByText('charmander');
    const types1 = screen.getByText('grass');
    const types2 = screen.getByText('poison');
    const types3 = screen.getByText('fire');

    expect(name1).toBeInTheDocument();
    expect(name2).toBeInTheDocument();
    expect(types1).toBeInTheDocument();
    expect(types2).toBeInTheDocument();
    expect(types3).toBeInTheDocument();
  });

  test('render nothing when pokemons array is empty', () => {
    render(<CardList pokemons={[]} />);

    const imgs = screen.queryAllByRole('img');
    expect(imgs).toHaveLength(0);
  });
});
