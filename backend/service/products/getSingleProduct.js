const Product = require("../../model/Product");
const getSingleProduct = async (slug) => {
  const product = await Product.findOne({ slug: slug })
    .populate({ path: "category", select: "name -_id" })
    .populate({ path: "reviews", select: "-_id -__v" });
  return product;
};

module.exports = getSingleProduct;
