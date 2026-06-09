import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../../app/context/hooks/useTheme';
import PaginationButton from '../../../shared/ui/PaginationButton';
import { getPaginationRage } from '../../../shared/utils/getPaginationRage';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = getPaginationRage(currentPage, totalPages);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gradientText = isDark
    ? 'bg-linear-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent'
    : 'bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent';
  const activePage = `border-border ${gradientText} font-bold`;
  const inactivePage = isDark
    ? 'border-border hover:bg-violet-400/20 hover:border-violet-400 active:bg-violet-400/70 active:border-violet-400'
    : 'border-border hover:bg-orange-400/70 hover:border-orange-400 active:bg-orange-400/70 active:border-orange-400';
  return (
    <div className="flex gap-2 items-center justify-center">
      <PaginationButton
        title="Prev"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={() => onPageChange(currentPage - 1)}
        icon={<ChevronLeft />}
        iconPosition="left"
        isDark={isDark}
      />
      {pages.map((page, index) =>
        page === '...' ? (
          <span
            key={`dots-${index}`}
            className="
            w-8 h-8 
            flex items-center justify-center 
            rounded-md border border-gray-500 opacity-60 
            cursor-default"
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            disabled={page === currentPage}
            onClick={() => onPageChange(page as number)}
            className={`
              w-8 h-8 rounded-md border border-gray-500
              ${page === currentPage ? activePage : inactivePage}
            `}
          >
            {page}
          </button>
        )
      )}
      <PaginationButton
        title="Next"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={() => onPageChange(currentPage + 1)}
        icon={<ChevronRight />}
        iconPosition="right"
        isDark={isDark}
      />
    </div>
  );
}
