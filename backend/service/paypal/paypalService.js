const { PAYPAL_CLIENT_ID } = require('../../config');
const paypalService = () => {
  if (!PAYPAL_CLIENT_ID) {
    throw new Error('Client Not Found');
  }
  return { result: { key: PAYPAL_CLIENT_ID } };
};
module.exports = paypalService;
