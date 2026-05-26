import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchButton from './SearchButton';
import { ThemeProvider } from '../../../app/context/ThemeContext';

function renderSearchButton(props = () => {}) {
  return render(
    <ThemeProvider>
      <SearchButton onClick={props} />
    </ThemeProvider>
  );
}

describe('SearchButton', () => {
  test('renders search button', () => {
    renderSearchButton()
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  test('renders correct button text', () => {
    renderSearchButton()
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Search');
  });

  test('calls onClick when button is clicked', async () => {
    const handleClick = vi.fn();
    renderSearchButton(handleClick)

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
