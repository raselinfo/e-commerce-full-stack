const Product = require("../../model/Product");
const getAllProductsController = async (req, res, next) => {
  const products = await Product.find({})
    .populate({
      path: "category",
      select: "name -_id",
    })
    .populate({ path: "reviews", select: "text rating -_id" });

  console.log(products);
};

module.exports = getAllProductsController;
