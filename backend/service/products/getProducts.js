const Product = require('../../model/Product');
const getProducts = async () => {
  
  const products = await Product.find({})
    .populate({
      path: 'category',
      select: 'name -_id',
    })
    .populate({ path: 'reviews', select: 'text rating -_id' });
  return products;
};

module.exports = getProducts;
