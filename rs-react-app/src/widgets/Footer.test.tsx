import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  test('renders copyright text with correct year', () => {
    render(<Footer />);

    const year = new Date().getFullYear();
    const copyright = screen.getByText(`© ${year} All rights reserved`);

    expect(copyright).toBeInTheDocument();
  });

  test('renders github link', () => {
    render(<Footer />);

    const link = screen.getByRole('link', {
      name: 'Link to MikeKruk github profile',
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/MikeKruk');
  });

  test('github link opens in new tab', () => {
    render(<Footer />);

    const link = screen.getByRole('link', {
      name: 'Link to MikeKruk github profile',
    });

    expect(link).toHaveAttribute('target', '_blank');
  });
});
