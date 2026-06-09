import { createSlice } from '@reduxjs/toolkit';
import { COUNTRIES } from '../../../shared/constants/constants';

const countriesSlice = createSlice({
  name: 'countries',
  initialState: COUNTRIES,
  reducers: {},
});

export default countriesSlice.reducer;
