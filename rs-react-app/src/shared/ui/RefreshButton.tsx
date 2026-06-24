import { RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from '../../app/context/hooks/useTheme';

interface RefreshButtonProps {
  onClick: () => void;
  isText: boolean;
}

export default function RefreshButton({ onClick, isText }: RefreshButtonProps) {
  const t = useTranslations('home');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const hoverClass = isDark
    ? 'hover:bg-violet-400/20 hover:border-violet-400 active:bg-violet-400/20 active:border-violet-400'
    : 'hover:bg-orange-400/70 hover:border-orange-400 active:bg-orange-400/70 active:border-orange-400';
  return (
    <button
      className={`
        flex items-center gap-2 
        px-3 py-1 rounded-md
        border border-border transition-colors ${hoverClass}`}
      onClick={onClick}
    >
      <RefreshCw size={16} />
      {isText && <span className="hidden md:inline">{t('refresh')}</span>}
    </button>
  );
}
