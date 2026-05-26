import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../app/context/hooks/useTheme';

export default function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button onClick={toggleTheme} aria-label="Toggle theme">
        <span
          className={`
            md:hidden
            flex items-center justify-center
            w-8 h-8 rounded-full
            shadow-md transition-all duration-500
            ${
              isDark
                ? 'bg-linear-to-r from-violet-400 to-indigo-500'
                : 'bg-linear-to-r from-yellow-300 to-amber-400'
            }
            `}
        >
          {isDark ? (
            <Moon className="w-3 h-3 text-white" />
          ) : (
            <Sun className="w-3 h-3 text-white" />
          )}
        </span>

      <span
        className={`
          hidden md:flex items-center
          relative w-16 h-8 rounded-full px-1
          transition-all duration-500
          ${
            isDark
              ? 'bg-linear-to-r from-indigo-950 to-violet-900'
              : 'bg-linear-to-r from-yellow-500 to-orange-500'
          }
        `}
      >
        <span
          className={`
            absolute top-1 w-6 h-6 rounded-full
            flex items-center justify-center
            shadow-md transition-all duration-500
            ${
              isDark
                ? 'translate-x-8 bg-linear-to-r from-violet-400 to-indigo-500'
                : 'translate-x-0 bg-linear-to-r from-yellow-300 to-amber-400'
            }
            `}
        >
          {isDark ? (
            <Moon className="w-3 h-3 text-white" />
          ) : (
            <Sun className="w-3 h-3 text-white" />
          )}
        </span>
      </span>
    </button>
  );
}
