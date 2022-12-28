const setCouponService = require('../../service/coupon/setCouponService');
const JOI = require('joi');
// Documentation
// getCouponController handle coupon to save
const getCouponController = async (req, res, next) => {
  try {
    const couponSchema = JOI.object({
      code: JOI.string().required(),
      discount: JOI.number().required(),
      owner: JOI.string().required(),
    });
    const { error, value } = couponSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const { result } = await setCouponService(value);
    return res.status(201).json({ message: 'Success', data: result });
  } catch (err) {
    return next(err);
  }
};

module.exports = getCouponController;
