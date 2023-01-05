const paypalService = require('../../service/paypal/paypalService.js');
const paypalController = (_req, res, next) => {
  try {
    const { result } = paypalService();
    return res.status(200).json({ message: 'OK', data: result });
  } catch (err) {
    return next(err);
  }
};

module.exports = paypalController;
