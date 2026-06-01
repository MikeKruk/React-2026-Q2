import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../../entities/pokemon/api/pokemonApi';
import SelectedItemsReducer from '../../features/selectedItems/selectedItemsSlice';

export const store = configureStore({
  reducer: {
    selectedItems: SelectedItemsReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
