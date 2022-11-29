const getProductByProperty = require("../../service/products/getProductByProperty");
const CustomError = require("../../utils/Error");

const getProductBySlugController = async (req, res, next) => {
  const { slug } = req.params;
  try {
    const product = await getProductByProperty("slug", slug);
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

module.exports = getProductBySlugController;
