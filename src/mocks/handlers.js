// src/mocks/handlers.js
import { rest } from 'msw';
import housingData from './data/housingInfos.json';

export const handlers = [
  // rest.post('/'counter/fetchCount'', (req, res, ctx) => {
  //   // Persist user's authentication in the session
  //   sessionStorage.setItem('is-authenticated', 'true');

  //   return res(
  //     // Respond with a 200 status code
  //     ctx.status(200)
  //   );
  // }),

  rest.get('http://localhost:3001/housingInfos', async (req, res, ctx) => {
    return await res(ctx.status(200), ctx.json({ data: housingData }));
  }),
  // rest.get('http://localhost:3001/housingInfos', (req, res, ctx) => {
  //   return res(ctx.status(500));
  // }),
];
