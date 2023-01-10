const app = require('../app/app');
const request = require('supertest');
it('test one', async () => {
  const response = await request(app).get('/api/v1/health');
  console.log(response);
  expect(response.status).toBe(200);
});
