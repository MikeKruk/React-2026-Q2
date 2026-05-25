import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../app/context/ThemeContext';
import AboutPage from './AboutPage';

function renderAboutPage() {
  return render(
    <ThemeProvider>
      <AboutPage />
    </ThemeProvider>
  );
}

describe('AboutPage', () => {
  test('renders heading', () => {
    renderAboutPage();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  test('renders author name', () => {
    renderAboutPage();
    expect(screen.getByText('MikeKruk')).toBeInTheDocument();
  });

  test('renders GitHub link', () => {
    renderAboutPage();
    expect(
      screen.getByRole('link', { name: 'GitHub Profile' })
    ).toHaveAttribute('href', 'https://github.com/MikeKruk');
  });

  test('renders RS School link', () => {
    renderAboutPage();
    expect(
      screen.getByRole('link', { name: 'RS School React course' })
    ).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
  });
});
