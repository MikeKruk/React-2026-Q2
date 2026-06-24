'use client';
import Error from '@/shared/ui/Error';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return <Error error={error} reset={reset} />;
}
