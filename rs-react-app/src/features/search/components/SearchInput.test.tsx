import { render, screen } from '@testing-library/react';
import SearchInput from './SearchInput';
import userEvent from '@testing-library/user-event';

describe('SearchInput', () => {
  test('renders search input', () => {
    render(<SearchInput value="" onChange={() => {}} />);
    const input = screen.getByLabelText('Search field');

    expect(input).toBeInTheDocument();
  });

  test('displays provided value', () => {
    render(<SearchInput value="bulbasaur" onChange={() => {}} />);
    const input = screen.getByLabelText('Search field');

    expect(input).toHaveValue('bulbasaur');
  });

  test('calls onChange when user types', async () => {
    const handleChange = vi.fn();
    render(<SearchInput value="bulbasaur" onChange={handleChange} />);
    const input = screen.getByLabelText('Search field');
    await userEvent.type(input, 'bulbasaur');

    expect(handleChange).toHaveBeenCalled();
  });

  test('displays empty value when no value provided', () => {
    render(<SearchInput value="" onChange={() => {}} />);
    const input = screen.getByLabelText('Search field');

    expect(input).toHaveValue('');
  });
});
