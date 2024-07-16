import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Price from '../../models/price';
import axios from 'axios';

interface DataState {
  prices: { [key: string]: Price[] };
  id: string;
  loading: boolean;
}

const initialState: DataState = {
  prices: {},
  id: 'bitcoin',
  loading: false,
};

const ids = ['bitcoin', 'ethereum', 'tether', 'binancecoin', 'solana'];

export const getData = createAsyncThunk(
  'data/fetchData',
  async () => {
    const responses = await Promise.all(ids.map(id => axios.get<Price[]>(`http://localhost:5000/getPriceData/${id}`)));
    return responses.reduce((acc, response, index) => {
      acc[ids[index]] = response.data;
      return acc;
    }, {} as { [key: string]: Price[] });
  }
);

const dataState = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getData.fulfilled, (state, action: PayloadAction<{ [key: string]: Price[] }>) => {
        state.prices = action.payload;
        state.loading = false;
      })
      .addCase(getData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setId } = dataState.actions;
export default dataState.reducer;
