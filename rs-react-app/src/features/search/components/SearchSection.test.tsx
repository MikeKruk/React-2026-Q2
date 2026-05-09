import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchSection from './SearchSection';

describe('SearchSection', () => {
  test('renders search input and button', () => {
    render(<SearchSection value="" onSearch={() => {}} onChange={() => {}} />);

    const input = screen.getByLabelText('Search field');
    const button = screen.getByRole('button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('displays provided value in input', () => {
    render(
      <SearchSection
        value="bulbasaur"
        onSearch={() => {}}
        onChange={() => {}}
      />
    );

    const input = screen.getByLabelText('Search field');

    expect(input).toHaveValue('bulbasaur');
  });

  test('calls onSearch when button is clicked', async () => {
    const handleClick = vi.fn();
    render(
      <SearchSection value="" onSearch={handleClick} onChange={() => {}} />
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('calls onChange when user types', async () => {
    const handleChange = vi.fn();
    render(
      <SearchSection value="" onSearch={() => {}} onChange={handleChange} />
    );

    const input = screen.getByLabelText('Search field');
    await userEvent.type(input, 'bulbasaur');

    expect(handleChange).toHaveBeenCalled();
  });
});
