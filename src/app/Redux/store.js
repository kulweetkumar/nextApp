import { configureStore } from '@reduxjs/toolkit';
import contactSlice from './contactSlice'; // Create a slice for contacts

const store = configureStore({
  reducer: {
    contacts: contactSlice
  },
});

export default store;