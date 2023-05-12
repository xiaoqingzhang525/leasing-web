import { fetchRequest } from './index';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getHousingInfos = createAsyncThunk('/housingInfos', async () => {
  const response = await fetchRequest('/housingInfos');
  console.log(response);
  return response.data;
});
