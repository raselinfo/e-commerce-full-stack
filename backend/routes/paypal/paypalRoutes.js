const router = require('express').Router();
const authenticationMiddleware = require('../../middleware/auth/authentication.middleware');
const paypalController = require('../../controller/paypal/paypalController');
// router.get('/paypal/key', authenticationMiddleware, paypalController);

router.get('/paypal/key', paypalController);
module.exports = router;
