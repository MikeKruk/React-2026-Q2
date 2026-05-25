import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../../app/context/ThemeContext';
import { store } from '../../../app/store/store';
import { mockPokemon } from '../../../test-utils/mocks/mockPokemon';
import Card from './Card';

function renderCard() {
  return render(
    <Provider store={store}>
      <ThemeProvider>
        <Card pokemon={mockPokemon} onClick={vi.fn()} />
      </ThemeProvider>
    </Provider>
  );
}

describe('Card', () => {
  test('renders pokemon name', () => {
    renderCard();

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
  });

  test('render pokemon image with correct src and alt', () => {
    renderCard();

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute(
      'src',
      mockPokemon.sprites.other['official-artwork'].front_default
    );
    expect(img).toHaveAttribute('alt', mockPokemon.name);
  });

  test('render pokemon types', () => {
    renderCard();

    expect(screen.getByText('grass')).toBeInTheDocument();
    expect(screen.getByText('poison')).toBeInTheDocument();
  });
});
