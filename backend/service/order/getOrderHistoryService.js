const Order = require('../../model/Order');
const getOrderHistoryService = async ({ userID }) => {
  try {
    const orders = await Order.find({ user: userID }).select(
      '_id totalPrice isPaid isDelivered createdAt'
    );
    return { result: orders };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = getOrderHistoryService;
