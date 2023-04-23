import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/reducers/counterReducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
