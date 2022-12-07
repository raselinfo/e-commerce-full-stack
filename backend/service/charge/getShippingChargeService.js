const ShippingChargeModel = require('../../model/ShippingPrice');
/**
 *
 * @param {*} city
 * @return {ShippingCharge Object}
 */
const getShippingChargeService = async (city) => {
  console.log('city', city);
  try {
    const shippingCharge = await ShippingChargeModel.findOne({
      city: city.toLowerCase().trim(),
    });
    if (!shippingCharge) return { error: `No shipping details found by ${city}` };
    return { result: shippingCharge };
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = getShippingChargeService;
