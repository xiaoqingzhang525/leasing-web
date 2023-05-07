import { fetchRequest } from './index';

export const counterFetch = async () => {
  try {
    return await fetchRequest('counter/fetchCount');
  } catch (error) {
    console.log(error);
  }
};
