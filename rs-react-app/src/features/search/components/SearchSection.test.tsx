import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../../app/context/ThemeContext';
import SearchSection from './SearchSection';

const defaultPorps = {
  value: '',
  onSearch: () => {},
  onChange: () => {},
}

function renderSearchSection(props = defaultPorps) {
  return render(
    <ThemeProvider>
      <SearchSection {...props} />
    </ThemeProvider>
  );
}

describe('SearchSection', () => {
  test('renders search input and button', () => {
    renderSearchSection();

    const input = screen.getByLabelText('Search field');
    const button = screen.getByRole('button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('displays provided value in input', () => {
    renderSearchSection({...defaultPorps, value: 'bulbasaur'});

    const input = screen.getByLabelText('Search field');

    expect(input).toHaveValue('bulbasaur');
  });

  test('calls onSearch when button is clicked', async () => {
    const handleClick = vi.fn();
    renderSearchSection({...defaultPorps, onSearch: handleClick});

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('calls onChange when user types', async () => {
    const handleChange = vi.fn();
    renderSearchSection({...defaultPorps, onChange: handleChange});

    const input = screen.getByLabelText('Search field');
    await userEvent.type(input, 'bulbasaur');

    expect(handleChange).toHaveBeenCalled();
  });
});
