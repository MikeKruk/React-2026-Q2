'use client';
import { Link, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useTheme } from '../app/context/hooks/useTheme';
import LanguageSwitcher from './LanguageSwitcher';
import ToggleThemeButton from './ToggleThemeButton';

export default function Header() {
  const t = useTranslations('header');
  const pathName = usePathname();
  const isHome = pathName === '/' || /^\/\d+/.test(pathName);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gradientText = isDark
    ? 'bg-linear-to-r from-violet-400 to-indigo-500 bg-clip-text'
    : 'bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text';

  const activeLink = `${gradientText} font-bold`;
  const inactiveLink = 'hover:underline';
  return (
    <header className="flex flex-wrap justify-between items-center mt-0.5 gap-y-3">
      <h1
        className={`
          w-full md:w-auto text-center  
          text-xl font-bold 
          bg-clip-text text-transparent  
          ${gradientText} 
        `}
      >
        Pokémon Explorer
      </h1>
      <nav className="flex gap-4">
        <Link href="/1" className={isHome ? activeLink : inactiveLink}>
          {t('home')}
        </Link>
        <Link
          href="/about"
          className={pathName === '/about' ? activeLink : inactiveLink}
        >
          {t('about')}
        </Link>
      </nav>
      <div className="flex gap-4 items-center">
        <LanguageSwitcher />
        <ToggleThemeButton />
      </div>
    </header>
  );
}
