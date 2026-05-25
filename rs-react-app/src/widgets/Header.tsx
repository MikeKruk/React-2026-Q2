import { Link, useMatchRoute } from '@tanstack/react-router';
import { useTheme } from '../app/context/hooks/useTheme';
import ToggleThemeButton from './ToggleThemeButton';

export default function Header() {
  const useMatch = useMatchRoute();
  const isHome = !!useMatch({
    to: '/$page',
    fuzzy: true,
  });
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const gradientText = isDark
    ? 'bg-linear-to-r from-violet-400 to-indigo-500 bg-clip-text text-transparent'
    : 'bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent ';
  return (
    <header className="flex justify-between items-center">
      <h1
        className={`
      text-xl font-bold 
      bg-clip-text text-transparent  
      ${gradientText} 
        `}
      >
        Pokémon Explorer
      </h1>
      <nav className="flex gap-4">
        <Link
          to="/$page"
          params={{ page: 1 }}
          className={`hover:underline active:${gradientText} ${isHome ? `${gradientText} font-bold` : ''}`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`hover:underline active:${gradientText}`}
          activeProps={{ className: `${gradientText} font-bold` }}
        >
          About
        </Link>
      </nav>
      <ToggleThemeButton />
    </header>
  );
}
