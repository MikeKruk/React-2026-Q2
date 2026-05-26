import { useAppSelector } from '../../../app/store/hooks';

export function useSelectedItemsCount() {
  return useAppSelector((state) => state.selectedItems.selectedItems.length);
}
