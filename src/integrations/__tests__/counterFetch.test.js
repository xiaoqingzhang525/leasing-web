import { counterFetch } from '../counterIntegration';

describe('counter fetch', () => {
  it('should return correct data', async () => {
    const data = await counterFetch();
    expect(data).toHaveProperty('amount', 17);
  });
});
