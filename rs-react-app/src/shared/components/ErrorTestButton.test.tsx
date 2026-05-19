import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import ErrorTestButton from './ErrorTestButton';
import userEvent from '@testing-library/user-event';

describe('ErrorTestButton', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  test('renders throw error button', () => {
    render(<ErrorTestButton />);

    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
  });

  test('throw error when button is clicked', async () => {
    render(
      <ErrorBoundary>
        <ErrorTestButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button');
    await userEvent.click(button);
    const errorMessage = screen.getByText('Something went wrong. Please refresh the page');

    expect(errorMessage).toBeInTheDocument();
  });
});
