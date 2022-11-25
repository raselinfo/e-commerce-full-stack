const Product = require("../../model/Product");
const mongoose = require("mongoose");
const getProductByProperty = async (key, value) => {
  if (key === "_id") {
    return Product.findById(mongoose.Types.ObjectId(value))
      .populate({ path: "category", select: "name -_id" })
      .populate({ path: "reviews", select: "-_id -__v" });
  }

  return Product.findOne({ [key]: value })
    .populate({ path: "category", select: "name -_id" })
    .populate({ path: "reviews", select: "-_id -__v" });
};

module.exports = getProductByProperty;
