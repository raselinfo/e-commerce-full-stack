const ShippingPrice = require('../../model/ShippingPrice');
const Error = require('../../utils/Error');
const addShippingChargeService = async (value) => {
  const { city, amount, discountCharge, charge } = value;
  try {
    const newShippingPrice = new ShippingPrice({
      city: city.toLowerCase().trim(),
      amount,
      discountCharge,
      charge,
    });

    const shippingPrice = await newShippingPrice.save();
    return { result: shippingPrice };
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = addShippingChargeService;
