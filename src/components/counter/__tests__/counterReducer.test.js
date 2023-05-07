import counterReducer, {
  increment,
  decrement,
  incrementByAmount,
} from '../../../reducers/counterReducer';

import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import createMockStore from 'redux-mock-store';

const mockStore = createMockStore([]);

describe('counterReducer with persist', () => {
  let store;

  beforeEach(() => {
    store = createStore(counterReducer);
    persistStore(store);
  });

  it('should persist the state', () => {
    store.dispatch(increment());
    store.dispatch(increment());
    store.dispatch(decrement());
    expect(store.getState().value).toEqual(1);
  });

  it('should handle actions using mock store', () => {
    const initialState = { value: 0 };
    const store = mockStore(initialState);

    store.dispatch(increment());
    store.dispatch(decrement());

    const actions = store.getActions();
    expect(actions).toEqual([increment(), decrement()]);
    expect(store.getState().value).toEqual(0);
  });
});

describe('counter reducer', () => {
  const initialState = {
    value: 3,
    status: 'idle',
  };

  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      value: 0,
      status: 'idle',
    });
  });

  it('should handle increment', () => {
    const actual = counterReducer(initialState, increment());
    expect(actual.value).toEqual(4);
  });

  it('should handle decrement', () => {
    const actual = counterReducer(initialState, decrement());
    expect(actual.value).toEqual(2);
  });

  it('should handle incrementByAmount', () => {
    const actual = counterReducer(initialState, incrementByAmount(2));
    expect(actual.value).toEqual(5);
  });
});
