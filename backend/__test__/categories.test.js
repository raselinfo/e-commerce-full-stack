const { noAuthApiHandler, mongoose } = require('./index.js');
describe('Categories => PUT: /categories', () => {
  let api;
  beforeAll(() => {
    api = noAuthApiHandler({ endPoint: '/categories', method: 'get' });
  });
  afterAll(() => {
    mongoose.disconnect();
  });
  it('Should return 200 status code', async () => {
    const response = await api.send({});
    expect(response.statusCode).toBe(200);
  });
  it('Should return a OK message', async () => {
    const response = await api.send({});
    const message = response.body.message;
    expect(message).toBe('OK');
  });
  it('Should a array of category in the data', async () => {
    const response = await api.send({});
    const body = response.body.data;
    expect(Array.isArray(body)).toBe(true);
  });
});
