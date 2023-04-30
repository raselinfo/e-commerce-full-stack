const getOrderService = require('../../service/order/getOrderService');
const getOrderController = async (req, res, next) => {
  try {
    const { orderID } = req.params;
    const { result } = await getOrderService({ orderID });
    return res.status(200).json({ message: 'OK', data: result });
  } catch (err) {
    return next(err);
  }
};

module.exports = getOrderController;
