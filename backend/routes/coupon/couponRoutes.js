const router = require('express').Router();
const setCouponController = require('../../controller/coupon/setCouponController');
const getCouponController = require('../../controller/coupon/getCouponController');
const adminMiddleware = require('../../middleware/auth/admin.middleware');
const authenticationMiddleware = require('../../middleware/auth/authentication.middleware');
router.post(
  '/set_coupon',
  // [authenticationMiddleware, adminMiddleware],
  setCouponController
);
router.get('/get_coupon', getCouponController);

module.exports = router;
