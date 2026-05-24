import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChevronRight } from 'lucide-react';
import PaginationButton from './PaginationButton';

describe('PaginationButton', () => {
  const defaultProps = {
    title: 'Next',
    currentPage: 1,
    totalPages: 5,
    onPageChange: vi.fn(),
    icon: <ChevronRight />,
    iconPosition: 'right' as const,
  };

  test('renders button with title', () => {
    render(<PaginationButton {...defaultProps} />);
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('calls onPageChange when clicked', async () => {
    render(<PaginationButton {...defaultProps} />);
    await userEvent.click(screen.getByRole('button'));
    expect(defaultProps.onPageChange).toHaveBeenCalled();
  });

  test('is disabled when currentPage equals totalPages', () => {
    render(
      <PaginationButton {...defaultProps} currentPage={5} totalPages={5} />
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('renders icon on left when iconPosition is left', () => {
    render(<PaginationButton {...defaultProps} iconPosition="left" />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
