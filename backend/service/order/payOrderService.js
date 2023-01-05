const Order = require('../../model/Order');
const payOrderService = async ({ details, orderID }) => {
  try {
    const getOrder = await Order.findById(orderID);
    if (!getOrder) {
      throw new Error('No order found!');
    }
    if (getOrder.isPaid) {
      throw new Error('Order already paid!');
    }
   
    getOrder.isPaid = true;
    getOrder.paidAt = Date.now();
    getOrder.paymentResult.id = details.id;
    getOrder.paymentResult.status = details.status;
    getOrder.paymentResult.updated_time = details.update_time;
    getOrder.paymentResult.email_address = details.payer.email_address;
    const updatedOrder = await getOrder.save();
    return { result: updatedOrder };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = payOrderService;
