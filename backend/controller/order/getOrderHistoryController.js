const getOrderHistoryService = require('../../service/order/getOrderHistoryService');
const getOrderHistoryController = async (req, res, next) => {
  try {
    const { result, pagination } = await getOrderHistoryService({
      userID: req.user._id,
      page: req.query.page,
      limit: req.query?.limit,
    });
    res.status(200).json({ message: 'OK', data: result, pagination });
  } catch (err) {
    next(err);
  }
};
module.exports = getOrderHistoryController;
