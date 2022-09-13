const getProducts = require("../../service/products/getProducts");
const CustomError = require("../../utils/Error");
const getAllProductsController = async (_req, res, next) => {
  try {
    const products = await getProducts();
    return res.status(200).json({ message: "Success", data: products });
  } catch (err) {
    next(CustomError.severError(err));
  }
};

module.exports = getAllProductsController;
