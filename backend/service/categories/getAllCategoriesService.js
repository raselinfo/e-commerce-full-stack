const Category = require('../../model/Category');
const getAllCategoriesService = async () => {
  try {
    const categories = await Category.find();
    return { result: categories };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = getAllCategoriesService;
