const Coupon = require('../../model/Coupon');
// Documentation
// getCouponService return if the coupon match
const getCouponService = async (code) => {
  try {
    code = String(code).trim();
    const getCoupon = await Coupon.findOne({ code: code }).select(
      '-__v -updatedAt -createdAt'
    );
    if (!getCoupon) {
      throw new Error('Invalid Coupon!');
    }
    return { result: getCoupon };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = getCouponService;
