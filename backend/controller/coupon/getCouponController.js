const getCouponService = require('../../service/coupon/getCouponService');
// Documentation
// getCouponController handle coupon to save
const getCouponController = async (req, res, next) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(404).json({ message: 'no coupon found' });
    }

    const { result } = await getCouponService(code);
    // result=> rasel360
    return res.status(200).json({ message: 'Coupon Apply', data: result });
  } catch (err) {
    return next(err);
  }
};

module.exports = getCouponController;
