export const getPaginationRage = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const left = currentPage - 1;
  const right = currentPage + 1;

  const showLeftDots = left > 3;
  const showRightDots = right < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }

  if (showLeftDots && !showRightDots) {
    return [
      1,
      '...',
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [1, '...', left, currentPage, right, '...', totalPages];
};
