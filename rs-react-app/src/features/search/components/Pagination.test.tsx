import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../../app/context/ThemeContext';
import Pagination from './Pagination';

const defaultProps = {
  currentPage: 1,
  totalPages: 5,
  onPageChange: vi.fn(),
};

function renderPagination(props = defaultProps) {
  return render(
    <ThemeProvider>
      <Pagination {...props} />
    </ThemeProvider>
  );
}

describe('Pagination', () => {
  afterEach(() => vi.clearAllMocks());

  test('renders page buttons', () => {
    renderPagination();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('calls onPageChange with next page when Next clicked', async () => {
    renderPagination({ ...defaultProps, currentPage: 2 });
    await userEvent.click(screen.getByText('Next', { exact: false }));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(3);
  });

  test('calls onPageChange with prev page when Prev clicked', async () => {
    renderPagination({ ...defaultProps, currentPage: 3 });
    await userEvent.click(screen.getByText('Prev', { exact: false }));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  test('current page button is disabled', () => {
    renderPagination({ ...defaultProps, currentPage: 2 });
    const currentPageBtn = screen.getByRole('button', { name: '2' });
    expect(currentPageBtn).toBeDisabled();
  });
});
