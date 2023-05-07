import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducers from '../rootReducers';
import thunkMiddleware from 'redux-thunk';

const middleware = [...getDefaultMiddleware(), thunkMiddleware];

const store = configureStore({
  reducer: rootReducers,
  // middleware: middleware,
});

export default store;
