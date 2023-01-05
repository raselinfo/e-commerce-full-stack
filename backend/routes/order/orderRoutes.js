const router = require('express').Router();
const authenticationMiddleware = require('../../middleware/auth/authentication.middleware');
const createOrderController = require('../../controller/order/createOrderController');
const getOrderController = require('../../controller/order/getOrderController');
const payOrderController = require('../../controller/order/payOrderController');

router.post('/order', authenticationMiddleware, createOrderController);
router.get('/order/:orderID', authenticationMiddleware, getOrderController);
router.put(
  '/order/pay/:orderID',
  authenticationMiddleware,
  payOrderController
);

module.exports = router;
