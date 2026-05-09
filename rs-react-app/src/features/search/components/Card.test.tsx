import { render, screen } from '@testing-library/react';
import Card from './Card';
import { mockPokemon } from '../../../test-utils/mocks/mockPokemon';



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
