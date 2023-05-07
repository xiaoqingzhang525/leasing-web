import { combineReducers } from '@reduxjs/toolkit';
import persistedCounterReducer from './reducers/counterReducer';

const rootReducers = combineReducers({
  counter: persistedCounterReducer,
});

export default rootReducers;
