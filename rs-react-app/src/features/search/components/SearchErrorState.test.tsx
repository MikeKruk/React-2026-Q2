import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchErrorState from './SearchErrorState';

describe('SearchErrorState', () => {
  test('renders error message', () => {
    render(
      <SearchErrorState
        message="Failed to get pokemon list"
        onRetry={() => {}}
      />
    );

    const message = screen.getByText('Failed to get pokemon list');
    expect(message).toBeInTheDocument();
  });

  test('renders retry button', () => {
    render(<SearchErrorState message="" onRetry={() => {}} />);

    const text = screen.getByText('Retry');
    expect(text).toBeInTheDocument();
  });

  test('calls onRetry when button is clicked', async () => {
    const handleClick = vi.fn();
    render(<SearchErrorState onRetry={handleClick} message="" />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});