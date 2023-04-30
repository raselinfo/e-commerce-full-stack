const Product = require('../../model/Product');
const mongoose = require('mongoose');
const getProductByProperty = async (key, value) => {
  if (key === '_id') {
    return Product.findById(mongoose.Types.ObjectId(value))
      .populate({ path: 'category', select: 'name' })
      .populate({ path: 'reviews', select: '-__v' });
  }

  return Product.findOne({ [key]: value })
    .populate({ path: 'category', select: 'name' })
    .populate({
      path: 'reviews',
      select: ' -__v',
      options: {
        sort: { createdAt: -1 },
      },
      populate: {
        path: 'user',
        model: 'User',
        select: 'name image',
      },
    });
};

module.exports = getProductByProperty;
