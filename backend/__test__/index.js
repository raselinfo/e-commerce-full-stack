const app = require('../app/app');
const request = require('supertest');
const mongoose = require('mongoose');
/**
 *
 * @param {*} param0
 * @returns
 */
exports.authApiHandler = ({ endPoint }) => {
  // Connect MongoDB
  mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return request(app)
    .put(`/api/v1/${endPoint}`)
    .set(
      'Cookie',
      'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGVtbyBVc2VyIiwiZW1haWwiOiJkZW1vQGdtYWlsLmNvbSIsImltYWdlIjp7InVybCI6Imh0dHA6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGcyazlybjBxL2ltYWdlL3VwbG9hZC92MTY3MzYzMTY2OS91c2Vyc1BpYy9kZW1vJTQwZ21haWwuY29tL3poMHFjaHNiamVkZjRwM2YwdWN6LnBuZyIsInB1YmxpY19pZCI6InVzZXJzUGljL2RlbW9AZ21haWwuY29tL3poMHFjaHNiamVkZjRwM2YwdWN6In0sInJvbGUiOiJVU0VSIiwiX2lkIjoiNjNiZGE5NzQwZGJjYzBjNGIzNTJkMTk4IiwiaWF0IjoxNjczNjg0NjkxLCJleHAiOjE3MDUyMjA2OTF9.vWkJGLFWizMwK8QgAFkLN7wPETAT_-0TdLg4GIF8iI4'
    )
    .set(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRGVtbyBVc2VyIiwiZW1haWwiOiJkZW1vQGdtYWlsLmNvbSIsImltYWdlIjp7InVybCI6Imh0dHA6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGcyazlybjBxL2ltYWdlL3VwbG9hZC92MTY3MzYzMTY2OS91c2Vyc1BpYy9kZW1vJTQwZ21haWwuY29tL3poMHFjaHNiamVkZjRwM2YwdWN6LnBuZyIsInB1YmxpY19pZCI6InVzZXJzUGljL2RlbW9AZ21haWwuY29tL3poMHFjaHNiamVkZjRwM2YwdWN6In0sInJvbGUiOiJVU0VSIiwiX2lkIjoiNjNiZGE5NzQwZGJjYzBjNGIzNTJkMTk4IiwiaWF0IjoxNjczNjg0NjkxLCJleHAiOjE3MDQ3ODg2OTF9.lOSrTu3Gs6F_DipX3XGbdzAslbOYQDMD0kaerWcIviE'
    )
    .set('Accept', 'application/json');
};

exports.mongoose = mongoose;
