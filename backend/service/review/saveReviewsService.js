const Review = require('../../model/Review');
const Product = require('../../model/Product');

// Documentations
// this service take user id, review data=> {text:string,rating:number,user:userId,product:productId} and save the review details in the database

const saveReviewsService = async ({ user, data }) => {
  try {
    const isReviewGiven = await Review.findOne({
      user: user._id,
      product: data.product,
    });
    if (isReviewGiven?._id) {
      throw new Error('You have review already!');
    }

    const saveReview = await new Review({
      text: data?.text,
      rating: data?.rating && Number(data?.rating),
      user: user._id,
      product: data.product, // Product id
    }).save();

    if (saveReview.user) {
      const allReviews = await Review.find({ product: data.product });

      const result = allReviews?.reduce(
        (acc, review) => {
          acc.avgRating += review.rating ? Number(review.rating) : 0;
          acc.ids.push(review._id);
          return acc;
        },
        { ids: [], avgRating: 0 }
      );
      if (Array.isArray(result.ids) && result.avgRating) {
        const product = await Product.findById(data?.product);
        product.reviews = result.ids;
        product.avgRating = result.avgRating / result.ids.length;
        const updatedProduct = await product.save();
        return { result: updatedProduct };
      }
    } else {
      throw new Error('Review does not save');
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
module.exports = saveReviewsService;
