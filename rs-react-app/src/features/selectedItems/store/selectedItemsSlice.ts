import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../../../entities/pokemon/types/types';

interface SelectedItems {
  selectedItems: Pokemon[];
}

const initialState: SelectedItems = {
  selectedItems: [],
};

const SelectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem(state, action: PayloadAction<Pokemon>) {
      state.selectedItems.push(action.payload);
    },

    unselectItem(state, action: PayloadAction<Pokemon>) {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload.id
      );
    },

    unselectAllItems(state) {
      state.selectedItems = [];
    },
  },
});

export const { selectItem, unselectItem, unselectAllItems } =
  SelectedItemsSlice.actions;
export default SelectedItemsSlice.reducer;
