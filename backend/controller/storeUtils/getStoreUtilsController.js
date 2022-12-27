const getStoreUtilsService = require('../../service/storeUtils/getStoreUtilsService');
const Error = require('../../utils/Error');

const getStoreUtilsController = async (req, res, next) => {
  try {
    const query = req.query;
    const { result } = await getStoreUtilsService(query);
    return res.status(200).json({ message: 'success', data: result });
  } catch (err) {
    return next(Error.severError(err.message));
  }
};

module.exports = getStoreUtilsController;
