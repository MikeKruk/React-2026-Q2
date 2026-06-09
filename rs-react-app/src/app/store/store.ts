import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../../entities/pokemon/api/pokemonApi';
import CountriesReducer from '../../features/forms/store/countriesSlice';
import FormsReducer from '../../features/forms/store/formsSlice';
import SelectedItemsReducer from '../../features/selectedItems/store/selectedItemsSlice';

export const store = configureStore({
  reducer: {
    selectedItems: SelectedItemsReducer,
    forms: FormsReducer,
    countries: CountriesReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
