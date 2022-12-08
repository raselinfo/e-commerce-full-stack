const router = require('express').Router();
const addShippingChargeController = require('../../controller/Charge/addShippingChargeController');
const getShippingChargeController = require('../../controller/Charge/getShippingChargeController');
const adminMiddleware = require('../../middleware/auth/admin.middleware');

router.post('/addShippingCharge', adminMiddleware, addShippingChargeController);

router.get('/getShippingCharge', getShippingChargeController);

module.exports = router;
