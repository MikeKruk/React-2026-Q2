import type { ReactNode } from 'react';

interface PaginationButtonProps {
  title: string;
  currentPage: number;
  totalPages: number;
  onPageChange: () => void;
  icon: ReactNode;
  iconPosition: 'left' | 'right';
}
export default function PaginationButton({
  title,
  currentPage,
  totalPages,
  onPageChange,
  icon,
  iconPosition,
}: PaginationButtonProps) {
  return (
    <button
      onClick={onPageChange}
      disabled={currentPage === totalPages}
      className="
        flex gap-1
        px-1 py-1 md:px-3
        rounded-md border border-gray-500
      hover:bg-orange-400/70 hover:border-orange-400
      active:bg-orange-400/70 active:border-orange-400
        disabled:opacity-40 disabled:cursor-not-allowed
        disabled:hover:bg-transparent disabled:hover:border-gray-500      
      "
    >
      {iconPosition === 'left' && icon}
      <span className="hidden sm:inline">{title}</span>
      {iconPosition === 'right' && icon}
    </button>
  );
}
