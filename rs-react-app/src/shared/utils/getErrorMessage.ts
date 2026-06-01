export const getErrorMessage = (error: unknown) => {
  if (!error) return null;
  return (error as { data: string }).data ?? 'Something went wrong';
};
