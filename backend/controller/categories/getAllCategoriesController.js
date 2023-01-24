const getAllCategoriesService = require('../../service/categories/getAllCategoriesService');
const getAllCategoriesController = async (req, res, next) => {
  try {
    const { result } = await getAllCategoriesService();
    res.status(200).json({ message: 'OK', data: result });
  } catch (err) {
    next(err);
  }
};

module.exports = getAllCategoriesController;
