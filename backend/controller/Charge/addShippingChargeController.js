const JOI = require('joi');
const addShippingChargeService = require('../../service/charge/addShippingChargeService');
const addShippingChargeController = (req, res, next) => {
  if (!req.body)
    return res.status(422).json({ message: 'Provide Valid Data!' });
  // Validate Data
  const shippingChargeSchema = JOI.object({
    city: JOI.string().min(2).trim().required(),
    amount: JOI.number().required(),
    discountCharge: JOI.number().required(),
    charge: JOI.number().required(),
  });

  const { error, value } = shippingChargeSchema.validate(req.body);
  if (error) {
    return next(error);
  }
  try {
    const result = addShippingChargeService(value);
  } catch (err) {
    return;
  }
};

module.exports = addShippingChargeController;
