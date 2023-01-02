const router = require('express').Router();
const authenticationMiddleware = require('../../middleware/auth/authentication.middleware');
const createOrderController = require('../../controller/order/createOrderController');
const getOrderController = require('../../controller/order/getOrderController');

router.post('/order', authenticationMiddleware, createOrderController);
router.get('/order/:orderID', getOrderController);

module.exports = router;
