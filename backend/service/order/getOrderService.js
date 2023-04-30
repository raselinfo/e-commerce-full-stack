const Order = require('../../model/Order');
const getOrderService = async ({ orderID }) => {
  try {
    const getOrder = await Order.findById(orderID).select(
      '-createdAt -updatedAt -__v'
    );
    if (!getOrder) {
      throw new Error('Order Not Found!');
    }
    return { result: getOrder };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = getOrderService;
