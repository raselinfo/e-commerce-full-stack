const { mongoose, authApiHandler } = require('./index');

let api;
describe('Profile => PUT : /api/v1/profile✅', () => {
  beforeAll(async () => {
    // Set Cookie and Authorization header
    api = authApiHandler({ endPoint: 'profile', method: 'put' });
  });
  afterAll(() => {
    mongoose.disconnect();
  });

  it('Should return 204 status code', async () => {
    const result = 200;
    const response = await api.send({
      name: 'Demo User',
    });

    expect(response.statusCode).toBe(result);
  });
  it('Should return a success message', async () => {
    const result = 'Update Successful';
    const response = await api.send({
      name: 'Demo User',
    });
    expect(response.body.message).toBe(result);
  });
});
