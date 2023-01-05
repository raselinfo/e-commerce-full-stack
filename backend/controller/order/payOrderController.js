const payOrderService = require('../../service/order/payOrderService');
const payOrderController = async (req, res, next) => {
  const details = req.body;
  const { orderID } = req.params;
  try {
    const { result } = await payOrderService({ details, orderID });
    res.status(200).json({ message: 'Order Successful', data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = payOrderController;
