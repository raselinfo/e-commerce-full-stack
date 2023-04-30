const getCouponService = require('../../service/coupon/getCouponService');
// Documentation
// getCouponController handle coupon to save
const getCouponController = async (req, res, next) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(404).json({ message: 'No coupon found' });
    }

    const { result } = await getCouponService(code);
    // result=> {"_id": "63aaaf5a74a7074f37d3ab4e",
        // "code": "rasel360",
        // "discount": 20,
        // "owner": "63a5451821eda0b21da6781a"}
    return res.status(200).json({ message: 'Coupon Apply', data: result });
  } catch (err) {
    return next(err);
  }
};



module.exports = getCouponController;
