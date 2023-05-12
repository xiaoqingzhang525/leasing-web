import { server } from '../../mocks/server';
import { rest } from 'msw';
import { fetchRequest } from '../index';

describe('counter fetch', () => {
  it('should return correct data when fetch API successfully', async () => {
    const result = await fetchRequest('/housingInfos');
    console.log(result);
    expect(result).toHaveProperty('data');
    expect(result.data).toHaveLength(3);
  });

  it('should return error message when fetch API failed', async () => {
    server.use(
      rest.get('http://localhost:3001/housingInfos', (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    expect.assertions(1);
    try {
      await fetchRequest('/housingInfos');
    } catch (e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e.message).toMatch('HTTP error! status: 500');
    }
  });
});
