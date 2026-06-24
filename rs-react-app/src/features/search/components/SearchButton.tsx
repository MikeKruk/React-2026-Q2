import { useTranslations } from 'next-intl';
import { useTheme } from '../../../app/context/hooks/useTheme';

interface SearchButtonProps {
  onClick: () => void;
}

export default function SearchButton({ onClick }: SearchButtonProps) {
  const t = useTranslations('home');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const hoverClass = isDark
    ? 'hover:bg-violet-400/20 hover:border-violet-400 active:bg-violet-400/20 active:border-violet-400'
    : 'hover:bg-orange-400/70 hover:border-orange-400 active:bg-orange-400/70 active:border-orange-400';
  return (
    <button
      onClick={onClick}
      className={`
        w-full max-w-1/3 md:max-w-35 p-0.5 rounded-md
        border border-border transition-colors
        ${hoverClass}
      `}
    >
      {t('search')}
    </button>
  );
}
