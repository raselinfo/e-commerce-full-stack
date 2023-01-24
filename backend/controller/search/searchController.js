const searchService = require('../../service/search/searchService.js');
const searchController = async (req, res, next) => {
  try {
    const { result, pagination } = await searchService({ queries: req.query });
    res
      .status(200)
      .json({ message: 'OK', pagination: pagination, data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = searchController;
