const getOrderHistoryService = require('../../service/order/getOrderHistoryService');
const getOrderHistoryController = async (req, res, next) => {
  try {
    const { result } = await getOrderHistoryService({ userID: req.user._id });
    res.status(200).json({ message: 'OK', data: result });
  } catch (err) {
    next(err);
  }
};
module.exports = getOrderHistoryController;
