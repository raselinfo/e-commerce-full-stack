const Product = require('../../model/Product');
const searchService = async ({ queries }) => {
  try {
    const limit = Number(queries.limit) || 10;
    const page = Number(queries.page) || 1;
    const skip = (page - 1) * limit;
    const category = queries.category || '';
    const price = queries.price || '';
    const rating = queries.rating || '';
    const searchQuery = queries.query || '';
    const sort = queries.sort || '';
    console.log(limit, skip);
    //   Filter by queries
    const searchFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter =
      category && category !== 'all'
        ? {
            category,
          }
        : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            avgRating: { $gte: Number(rating) },
          }
        : {};
    const priceFilter =
      price && price !== 'all'
        ? {
            price: {
              $gte: Number(price.split('-')[0]),
              $lte: Number(price.split('-')[1]),
            },
          }
        : {};
    // Filter
    const filter = {
      ...searchFilter,
      ...priceFilter,
      ...ratingFilter,
      ...categoryFilter,
    };

    // Sort
    const sortItems =
      sort === 'newest'
        ? { createdAt: -1 }
        : sort === 'lowest'
        ? { price: 1 }
        : sort === 'highest'
        ? { price: -1 }
        : sort === 'toprated'
        ? { avgRating: -1 }
        : { _id: -1 };

    // Get data from db using filter quires and sort
    const products = await Product.find(filter)
      .sort(sortItems)
      .skip(skip)
      .limit(limit);

    // Total Products
    const totalProducts = await Product.find(filter);
    const pages = Math.ceil(totalProducts.length / limit);
    return {
      result: products,
      pagination: {
        page: page,
        pages: pages,
      },
    };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = searchService;
