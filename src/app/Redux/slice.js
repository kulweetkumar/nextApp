import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const saveContactToDatabase = async (contactData) => {
  try {
    const response = await fetch('your_api_endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    const data = await response.json();
    return data; 
  } catch (error) {
    throw new Error('Failed to save contact data');
  }
};
export const saveContactAsync = createAsyncThunk(
  'contacts/saveContact',
  async (contactData, thunkAPI) => {
    try {
      const response = await saveContactToDatabase(contactData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
const initialState = {
  value: 0,
};
export const contactSlice = createSlice({
  name: 'contactUsSlice',
  initialState,
  reducers: {
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveContactAsync.pending, (state) => {
      })
      .addCase(saveContactAsync.fulfilled, (state, action) => {
      })
      .addCase(saveContactAsync.rejected, (state, action) => {
      });
  },
});
export const { decrement, incrementByAmount } = contactSlice.actions;
export default contactSlice.reducer;
