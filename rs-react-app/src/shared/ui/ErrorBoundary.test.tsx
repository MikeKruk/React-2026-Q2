import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

describe('ErrorBoundary', () => {
  const ThrowError = () => {
    throw new Error('Something went wrong');
  };

  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders children when there is no error ', () => {
    render(
      <ErrorBoundary>
        <div>Children</div>
      </ErrorBoundary>
    );
    const children = screen.getByText('Children');
    expect(children).toBeInTheDocument();
  });

  test('renders error message when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const errorMessage = screen.getByText(
      'Something went wrong. Please refresh the page'
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test('logs error to console when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(console.error).toHaveBeenCalled();
  });
});
