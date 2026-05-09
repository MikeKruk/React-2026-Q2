import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchButton from './SearchButton';

describe('SearchButton', () => {
  test('renders search button', () => {
    render(<SearchButton onClick={() => {}} />);
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  test('renders correct button text', () => {
    render(<SearchButton onClick={() => {}} />);
    const button = screen.getByRole('button');

    expect(button).toHaveTextContent('Search');
  });

  test('calls onClick when button is clicked', async () => {
    const handleClick = vi.fn();
    render(<SearchButton onClick={handleClick} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
