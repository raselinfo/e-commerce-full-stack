const router = require('express').Router();
const authenticationMiddleware = require('../../middleware/auth/authentication.middleware');
const createOrderController = require('../../controller/order/createOrderController');
const getOrderController = require('../../controller/order/getOrderController');
const payOrderController = require('../../controller/order/payOrderController');
const getOrderHistoryController = require('../../controller/order/getOrderHistoryController');

router.post('/order', authenticationMiddleware, createOrderController);
router.get('/order/:orderID', authenticationMiddleware, getOrderController);
router.put(
  '/order/pay/:orderID',
  authenticationMiddleware,
  payOrderController
);
router.get('/order_history', authenticationMiddleware, getOrderHistoryController);
module.exports = router;
