const getProductByProperty = require("../../service/products/getProductByProperty");
const CustomError = require("../../utils/Error");

const getProductByIdController = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const product = await getProductByProperty("_id", _id);
    res.status(200).json({ message: "Success", data: product });
  } catch (err) {
    next(CustomError.severError(err));
  }
};
module.exports = getProductByIdController;
