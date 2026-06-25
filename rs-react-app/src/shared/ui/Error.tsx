'use client';
import { useTranslations } from 'next-intl';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  const t = useTranslations('error');
  const { message } = error;
  return (
    <div className="flex flex-col gap-4 items-center text-center min-h-screen justify-center">
      <p>{t(`${message}`)}</p>
      <button
        onClick={reset}
        className={`
        w-full max-w-1/3 md:max-w-35 p-0.5 rounded-md
        border border-border transition-colors
        bg-linear-to-r from-accent-from to-accent-to bg-clip-text text-transparent
      `}
      >
        {t('retry')}
      </button>
    </div>
  );
}
