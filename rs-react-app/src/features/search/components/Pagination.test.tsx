import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

describe('Pagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange: vi.fn(),
  };

  afterEach(() => vi.clearAllMocks());

  test('renders page buttons', () => {
    render(<Pagination {...defaultProps} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('calls onPageChange with next page when Next clicked', async () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    await userEvent.click(screen.getByText('Next', { exact: false }));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  test('calls onPageChange with prev page when Prev clicked', async () => {
    render(<Pagination {...defaultProps} currentPage={3} />);
    await userEvent.click(screen.getByText('Prev', { exact: false }));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  test('current page button is disabled', () => {
    render(<Pagination {...defaultProps} currentPage={2} />);
    const currentPageBtn = screen.getByRole('button', { name: '2' });
    expect(currentPageBtn).toBeDisabled();
  });
});
