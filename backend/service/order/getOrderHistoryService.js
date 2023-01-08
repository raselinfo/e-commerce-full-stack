const Order = require('../../model/Order');
const getOrderHistoryService = async ({
  userID,
  page: p,
  limit: limitItem,
}) => {
  console.log(limitItem);
  try {
    const page = Number(p) || 1;
    const limit = Number(limitItem) || 1;
    const skip = (page - 1) * limit;
    const items = await Order.countDocuments({ user: userID });
    const pages = Math.ceil(items / limit);

    const orders = await Order.find({ user: userID })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .select('_id totalPrice isPaid isDelivered createdAt');

    return { result: orders, pagination: { page: page, pages: pages } };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = getOrderHistoryService;
