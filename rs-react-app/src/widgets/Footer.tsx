import { getTranslations } from 'next-intl/server';

export default async function Footer() {
  const year = new Date().getFullYear();
  const t = await getTranslations('footer');
  return (
    <footer>
      <div className="flex flex-row justify-between">
        <div>
          <p className="max-sm:text-sm">
            © {year} {t('allRightsReserved')}
          </p>
        </div>
        <p>
          {t('createdBy')}{' '}
          <a
            href="https://github.com/MikeKruk"
            aria-label="Link to MikeKruk github profile"
            target="_blank"
            rel="noreferrer"
            className="
              max-sm:text-sm font-bold
              hover:underline
              active:text-blue-500
              "
          >
            MikeKruk
          </a>
        </p>
      </div>
    </footer>
  );
}
