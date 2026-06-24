import { getTranslations, setRequestLocale } from 'next-intl/server';

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('about');
  return (
    <div className="flex flex-1 flex-col my-4 gap-8 max-w-2xl mx-auto items-center text-center">
      <h2 className="text-2xl font-bold">{t('title')}</h2>
      <div className="flex flex-col gap-4">
        <p>
          {t('author')}: <span className="text-text font-bold">MikeKruk</span>
        </p>
        <a
          href="https://github.com/MikeKruk"
          target="_blank"
          rel="noreferrer"
          className="
            font-semibold 
            hover:underline
            bg-linear-to-r from-accent-from to-accent-to bg-clip-text text-transparent
          "
        >
          {t('githubLink')}
        </a>

        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className="
            font-semibold 
            hover:underline
            bg-linear-to-r from-accent-from to-accent-to bg-clip-text text-transparent
          "
        >
          {t('courseLink')}
        </a>
      </div>
    </div>
  );
}
