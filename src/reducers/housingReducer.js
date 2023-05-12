import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { getHousingInfos } from '../integrations/housingFetch';

const initialState = {
  housingInfos: [],
  housingDetail: {},
  isLoading: false,
  error: null,
  alert: null,
};

const housingPersistConfig = {
  key: 'housing',
  whiteList: ['housingInfos'],
  storage,
};

export const housingSlice = createSlice({
  name: 'housing',
  initialState,
  reducers: {
    getHousingInfosById: (state, action) => {
      state.housingDetail = state.housingInfos.find(
        (h) => h.id === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHousingInfos.pending, (state) => {
        state.isLoading = true;
        state.alert = null;
        state.error = null;
      })
      .addCase(getHousingInfos.fulfilled, (state, action) => {
        state.housingInfos = action.payload;
        state.isLoading = false;
      })
      .addCase(getHousingInfos.rejected, (state, action) => {
        state.error = state.housingInfos?.length === 0 ? action.error : null;
        state.alert = action.error.message;
        state.isLoading = false;
      });
  },
});

const persistedHousingReducer = persistReducer(
  housingPersistConfig,
  housingSlice.reducer
);

export const { getHousingInfosById } = housingSlice.actions;

// selectors
export const getAlert = (state) => state.housingReducer.alert;

export default persistedHousingReducer;
