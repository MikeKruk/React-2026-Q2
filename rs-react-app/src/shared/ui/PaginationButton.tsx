import type { ReactNode } from 'react';

interface PaginationButtonProps {
  title: string;
  currentPage: number;
  totalPages: number;
  onPageChange: () => void;
  icon: ReactNode;
  iconPosition: 'left' | 'right';
  isDark?: boolean;
}
export default function PaginationButton({
  title,
  currentPage,
  totalPages,
  onPageChange,
  icon,
  iconPosition,
  isDark = false,
}: PaginationButtonProps) {
  const hoverClass = isDark
    ? 'hover:bg-violet-400/20 hover:border-violet-400 active:bg-violet-400/20 active:border-violet-400 disabled:hover:border-border'
    : 'hover:bg-orange-400/70 hover:border-orange-400 active:bg-orange-400/70 active:border-orange-400 disabled:hover:border-border';
  return (
    <button
      onClick={onPageChange}
      disabled={currentPage === totalPages}
      className={`
        flex gap-1 items-center
        px-1 py-1 md:px-3
        rounded-md border border-border
        disabled:opacity-40 disabled:cursor-not-allowed
        disabled:hover:bg-transparent
        transition-colors
        ${hoverClass}  
      `}
    >
      {iconPosition === 'left' && icon}
      <span className="hidden sm:inline">{title}</span>
      {iconPosition === 'right' && icon}
    </button>
  );
}
