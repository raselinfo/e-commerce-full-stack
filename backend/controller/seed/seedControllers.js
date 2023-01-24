const data = require('../../data/data');
const Product = require('../../model/Product');
const Category = require('../../model/Category.js');
const Review = require('../../model/Review.js');
const CustomError = require('../../utils/Error');

exports.seedProductController = async (req, res, next) => {
  try {
    await Product.deleteMany({});
    const categories = await Category.find();

    const products = data.products.map(async (product) => {
      const reviews = await Review.find({ product: product._id });
      const avgRating = reviews.reduce((acc, item) => {
        return (acc += item.rating);
      }, 0);

      const index = Math.floor(Math.random() * categories.length);
      const randomCategory = categories[index];
      return {
        ...product,
        category: randomCategory.name,
        reviews: reviews,
        avgRating: avgRating / reviews.length,
      };
    });

    const seedProducts = await Product.insertMany(await Promise.all(products));
    res.status(201).json({ message: 'Success', data: seedProducts });
  } catch (err) {
    next(CustomError.severError(err));
  }
};

exports.seedCategoryController = async (req, res, next) => {
  try {
    await Category.deleteMany({});
    const seedCategories = await Category.insertMany(data.category);
    res.status(201).json({ message: 'Success', data: seedCategories });
  } catch (err) {
    next(CustomError.severError(err));
  }
};

exports.seedReviews = async (req, res, next) => {
  try {
    await Review.deleteMany({});
    const seedReviews = await Review.insertMany(data.reviews);
    res.status(201).json({ message: 'Success', data: seedReviews });
  } catch (err) {
    next(CustomError.severError(err));
  }
};
// Shipping Charge
exports.seedShippingCharge = async (req, res, next) => {
  const Shipping = require('../../model/ShippingPrice');

  try {
    const newShipping = await new Shipping({
      ...req.body,
    }).save();
    return res.status(201).json({ message: 'ok', data: newShipping });
  } catch (err) {
    next(err);
  }
};

// Store Utils
exports.seedStoreUtils = async (req, res, next) => {
  const StoreUtils = require('../../model/StoreUtils');

  try {
    const newShipping = await new StoreUtils({
      ...req.body,
    }).save();
    return res.status(201).json({ message: 'ok', data: newShipping });
  } catch (err) {
    next(err);
  }
};

// Coupon
exports.seedCoupon = async (req, res, next) => {
  const Coupon = require('../../model/Coupon');

  try {
    const newShipping = await new Coupon({
      ...req.body,
    }).save();
    return res.status(201).json({ message: 'ok', data: newShipping });
  } catch (err) {
    next(err);
  }
};
