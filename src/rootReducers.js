import { combineReducers } from '@reduxjs/toolkit';
import persistedHousingReducer from './reducers/housingReducer';

const rootReducers = combineReducers({
  housingReducer: persistedHousingReducer,
});

export default rootReducers;
