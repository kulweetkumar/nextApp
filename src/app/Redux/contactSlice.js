// contactSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    data: [], // Ensure data property is initialized as an empty array
    loading: false,
    error: null,
  },
  reducers: {
    fetchDataStart: state => {
      state.loading = true;
      state.error = null;
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchDataStart, fetchDataSuccess, fetchDataFailure } = contactSlice.actions;

export default contactSlice.reducer;
