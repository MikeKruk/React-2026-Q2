import { ChevronLeft, ChevronRight } from 'lucide-react';
import PaginationButton from '../../../shared/components/PaginationButton';
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
  return (
    <div className="flex gap-2 items-center justify-center">
      <PaginationButton
        title="Prev"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={() => onPageChange(currentPage - 1)}
        icon={<ChevronLeft />}
        iconPosition="left"
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
            hover:bg-orange-400/70 hover:border-orange-400
            active:bg-orange-400/70 active:border-orange-400
            ${page === currentPage ? 'bg-orange-400/70 border-orange-400' : ''}
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
      />
    </div>
  );
}
