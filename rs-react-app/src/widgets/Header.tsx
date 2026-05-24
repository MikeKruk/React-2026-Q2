import { Link, useMatchRoute } from '@tanstack/react-router';

export default function Header() {
  const useMatch = useMatchRoute();
  const isHome = !!useMatch({
    to: '/$page',
    fuzzy: true,
  });
  return (
    <header className="flex justify-between items-center">
      <h1
        className="
      text-xl font-bold 
      bg-linear-to-r from-yellow-500 to-orange-500 
      bg-clip-text text-transparent"
      >
        Pokémon Explorer
      </h1>
      <nav className="flex gap-4">
        <Link
          to="/$page"
          params={{ page: 1 }}
          className={`hover:underline active:text-orange-500 ${isHome ? 'text-orange-500 font-bold' : ''}`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className="hover:underline active:text-orange-500"
          activeProps={{ className: 'text-orange-500 font-bold' }}
        >
          About
        </Link>
      </nav>
    </header>
  );
}
