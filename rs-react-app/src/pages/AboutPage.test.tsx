import { render, screen } from '@testing-library/react';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  test('renders heading', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  test('renders author name', () => {
    render(<AboutPage />);
    expect(screen.getByText('MikeKruk')).toBeInTheDocument();
  });

  test('renders GitHub link', () => {
    render(<AboutPage />);
    expect(
      screen.getByRole('link', { name: 'GitHub Profile' })
    ).toHaveAttribute('href', 'https://github.com/MikeKruk');
  });

  test('renders RS School link', () => {
    render(<AboutPage />);
    expect(
      screen.getByRole('link', { name: 'RS School React course' })
    ).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
