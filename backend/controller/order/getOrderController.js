const getOrderService = require('../../service/order/getOrderService');
const getOrderController = (req, res, next) => {
  console.log('getOrderController');
  getOrderService();
};

module.exports = getOrderController;
