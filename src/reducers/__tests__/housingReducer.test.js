import housingReducer, { getHousingInfosById } from '../housingReducer';
import { getHousingInfos } from '../../integrations/housingFetch';
import { configureStore } from '@reduxjs/toolkit';
import { housingData } from '../../mocks/data/housingInfos.json';

describe('reducers', () => {
  const initialState = {
    housingInfos: [],
    housingDetail: {},
    isLoading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(housingReducer(undefined, { type: 'unknown' })).toEqual({
      housingInfos: [],
      housingDetail: {},
      isLoading: false,
      error: null,
    });
  });

  it('should handle getHousingInfosById', () => {
    const actual = housingReducer(
      {
        ...initialState,
        housingInfos: [{ id: 1 }, { id: 2 }],
      },
      getHousingInfosById(1)
    );
    expect(actual.housingDetail).toEqual({ id: 1 });
  });
});

describe('extraReducers', () => {
  let store;

  beforeAll(() => {
    store = configureStore({
      reducer: housingReducer,
    });
  });

  it('should handle pending getHousingInfos', () => {
    store.dispatch(getHousingInfos());
    const state = store.getState();
    expect(state.isLoading).toBe(true);
  });

  it('should handle fulfilled getHousingInfos', () => {
    store.dispatch(getHousingInfos.fulfilled(housingData));
    const state = store.getState();
    expect(state.housingInfos).toEqual(housingData);
    expect(state.isLoading).toBe(false);
  });

  it('should handle rejected getHousingInfos', () => {
    const error = 'An error occurred';
    store.dispatch(getHousingInfos.rejected(error));
    const state = store.getState();
    expect(state.error).toEqual(null);
    expect(state.alert).toEqual('An error occurred');
    expect(state.isLoading).toBe(false);
  });
});
