const { mongoose, authApiHandler } = require('./index');
const Review = require('../model/Review');
let api;
describe('Profile => post : /api/v1/reviews', () => {
  beforeAll(async () => {
    // Set Cookie and Authorization header
    api = authApiHandler({ endPoint: 'reviews', method: 'post' });
  });
  afterAll(() => {
    mongoose.disconnect();
  });

  it('Should return 204 status code', async () => {
    const result = 201;
    const response = await api.send({
      text: 'Good',
      rating: 4.5,
      product: '62dac4f2cb81ebf743aa77f0',
    });
    expect(response.statusCode).toBe(result);
  });
});
