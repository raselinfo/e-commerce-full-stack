const Coupon = require('../../model/Coupon');
// Documentation
// setCouponService save the coupon details in database.
const setCouponService = async (value) => {
  try {
    const newCoupon = await new Coupon({
      code: value.code,
      discount: value.discount,
      owner: value.owner,
    }).save();
    return { result: newCoupon };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = setCouponService;
