import { fetchRequest } from './index';

// A mock function to mimic making an async request for data
export const fetchCounter = (amount) => {
  try {
    fetchRequest('counter/fetchCount', { amount: 2 });
  } catch (error) {
    throw error;
  }
};
