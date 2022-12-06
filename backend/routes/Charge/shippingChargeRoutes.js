const router = require('express').Router();
const addShippingChargeController = require('../../controller/Charge/addShippingChargeController');
const getShippingChargeController = require('../../controller/Charge/getShippingChargeController');

router.post('/addShippingCharge', addShippingChargeController);


// router.get('/getShippingCharge', getShippingChargeController);

module.exports = router;


