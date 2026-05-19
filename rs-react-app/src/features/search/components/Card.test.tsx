import { render, screen } from '@testing-library/react';
import { mockPokemon } from '../../../test-utils/mocks/mockPokemon';
import Card from './Card';

describe('Card', () => {
  const onClick = vi.fn();
  test('renders pokemon name', () => {
    render(<Card pokemon={mockPokemon} onClick={onClick} />);

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  test('render pokemon image with correct src and alt', () => {
    render(<Card pokemon={mockPokemon} onClick={onClick} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute(
      'src',
      mockPokemon.sprites.other['official-artwork'].front_default
    );
    expect(img).toHaveAttribute('alt', mockPokemon.name);
  });

  test('render pokemon types', () => {
    render(<Card pokemon={mockPokemon} onClick={onClick} />);

    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
  });
});
