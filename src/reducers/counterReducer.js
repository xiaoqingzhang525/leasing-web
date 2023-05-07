import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialState = {
  value: 0,
};

const counterPersistConfig = {
  key: 'counter',
  whiteList: ['value'],
  storage,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

const persistedCounterReducer = persistReducer(
  counterPersistConfig,
  counterSlice.reducer
);

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default persistedCounterReducer;
