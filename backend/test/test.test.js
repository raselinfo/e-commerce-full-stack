const request = require('supertest');
const app = require('../app/app');
it('test one', async () => {
  const response = await request(app).get('/api/v1/health');
  console.log('hello test✅🤬', response.status);
  expect(response.status).toBe(200);
});
