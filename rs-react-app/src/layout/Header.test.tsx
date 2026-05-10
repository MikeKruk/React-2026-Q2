import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  test('renders header title', () => {
    render(<Header />);

    const title = screen.getByRole('heading', { level: 1 });

    expect(title).toBeInTheDocument();
  });

  test('renders correct title text', () => {
    render(<Header />);

    const title = screen.getByRole('heading', { level: 1 });

    expect(title).toHaveTextContent('Pokémon Explorer');
  });
});
