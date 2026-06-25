import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('notFound');
  return (
    <div className="flex flex-col gap-6 justify-center items-center text-center h-screen">
      <h2 className="text-6xl font-bold bg-linear-to-r from-accent-from to-accent-to bg-clip-text text-transparent">
        404
      </h2>
      <p className="text-xl">{t('title')}</p>
      <Link
        href="/"
        className="
          font-semibold  
          px-4 py-2 
          rounded-md border border-gray-500 
          bg-linear-to-r from-accent-from to-accent-to bg-clip-text text-transparent
        "
      >
        {t('backLink')}
      </Link>
    </div>
  );
}
