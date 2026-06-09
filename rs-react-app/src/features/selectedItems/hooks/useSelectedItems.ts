import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import type { Pokemon } from '../../../entities/pokemon/types/types';
import { selectItem, unselectItem } from '../store/selectedItemsSlice';

export function useSelectedItems(pokemon: Pokemon) {
  const dispatch = useAppDispatch();
  const isSelected = useAppSelector((state) =>
    state.selectedItems.selectedItems.some((item) => item.id === pokemon.id)
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      dispatch(unselectItem(pokemon));
    } else {
      dispatch(selectItem(pokemon));
    }
  };

  return {
    isSelected,
    handleClick,
  };
}
