import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { useSelectedItemsCount } from '../hooks/useSelectedItemsCount';
import { downloadCSV } from '../lib/downloadCSV';
import { unselectAllItems } from '../selectedItemsSlice';

export default function SelectedItemsFlyout() {
  const t = useTranslations('csv');
  const dispatch = useAppDispatch();
  const selectedItemsCount = useSelectedItemsCount();
  const selectedPokemons = useAppSelector(
    (state) => state.selectedItems.selectedItems
  );

  if (selectedItemsCount === 0) return null;

  const handleClick = () => {
    dispatch(unselectAllItems());
  };

  const handleDownload = async () => {
    await downloadCSV(selectedPokemons);
  };

  return (
    <div
      className="
        flex flex-col md:flex-row items-center justify-between gap-1 md:gap-4
        w-full max-w-2xl mx-auto
        sticky bottom-0 z-10
        bg-white/10 backdrop-blur-xl
        px-6 py-4
        shadow-2xl
        rounded-2xl border border-white/20
      "
    >
      <p className="font-medium">
        {t('selectedItems')}:{' '}
        <span className="font-bold">{selectedItemsCount}</span>
      </p>

      <div className="flex gap-3">
        <button
          onClick={handleClick}
          className="rounded-lg border border-white/20 px-4 py-2 transition hover:bg-white/20 hover:scale-105"
        >
          {t('unselectAll')}
        </button>
        <button
          onClick={handleDownload}
          className="rounded-lg border border-white/20 px-4 py-2 transition hover:bg-white/20 hover:scale-105"
        >
          {t('download')}
        </button>
      </div>
    </div>
  );
}
