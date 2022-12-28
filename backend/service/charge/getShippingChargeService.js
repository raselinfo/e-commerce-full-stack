const ShippingChargeModel = require('../../model/ShippingPrice');
/**
 *
 * @param {*} city
 * @return {ShippingCharge Object}
 */
// Documentation
// this getShippingChargeService return shipping charge based on the city and itemPrice.

const getShippingChargeService = async (city, itemPrice) => {
  itemPrice = Number(itemPrice);
  city = city.toLowerCase();
  try {
    const shippingCharge = await ShippingChargeModel.findOne({
      city: city.toLowerCase().trim(),
    });
    // if city not found
    if (!shippingCharge || !shippingCharge?.on) {
      const allShippingCharge = await ShippingChargeModel.findOne({
        city: 'all',
      });
      if (!allShippingCharge || !allShippingCharge?.on) {
        return { error: `No shipping details found by ${city}` };
      }

      if (allShippingCharge.amount === 0) {
        return { result: allShippingCharge.charge };
      }
      if (allShippingCharge.amount <= itemPrice) {
        return { result: allShippingCharge.discountCharge };
      }
      return { result: allShippingCharge.charge };
    }

    // If city found
    if (!shippingCharge?.on) {
      return { error: `No shipping details found by ${city}` };
    }
    if (
      shippingCharge.amount <= itemPrice &&
      city.trim() === shippingCharge.city.trim()
    ) {
      return { result: shippingCharge.discountCharge };
    }
    return { result: shippingCharge.charge };
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = getShippingChargeService;
