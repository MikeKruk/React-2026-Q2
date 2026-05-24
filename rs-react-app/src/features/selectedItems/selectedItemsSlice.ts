import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../../shared/types/types';

interface SelectedItemsInterface {
  selectedItems: Pokemon[];
}

const initialState: SelectedItemsInterface = {
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
