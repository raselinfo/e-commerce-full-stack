const getProduct = require("../../service/products/getSingleProduct");
const CustomError = require("../../utils/error");

const getSingleProductController = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const product = await getProduct(slug);
    if (!product) {
      return next(CustomError.notFound("Product Not Found!"));
    }
    return res.status(200).json({
      message: "Success",
      data: product,
    });
  } catch (err) {
    next(CustomError.severError(err));
  }
};

module.exports = getSingleProductController;
