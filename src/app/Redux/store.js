import { configureStore } from '@reduxjs/toolkit';
import contactSlice from './slice';

const store = configureStore({
  reducer: {
    contacts: contactSlice
  },
});

export default store;