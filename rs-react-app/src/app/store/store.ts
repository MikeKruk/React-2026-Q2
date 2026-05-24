import { configureStore } from '@reduxjs/toolkit'
import SelectedItemsReducer from '../../features/selectedItems/selectedItemsSlice'

export const store = configureStore({
  reducer: {
    selectedItems: SelectedItemsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch