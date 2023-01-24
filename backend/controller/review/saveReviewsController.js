const saveReviewsService = require('../../service/review/saveReviewsService');
const saveReviewsController = async (req, res, next) => {
  try {
    if (req?.body?.text || req?.body?.rating) {
      const { result } = await saveReviewsService({
        data: req.body,
        user: req.user,
      });
      return res
        .status(201)
        .json({ message: 'Create Successful', data: result });
    }
    return res.status(409).json({ message: 'Please give your review!' });
  } catch (err) {
    next(err);
  }
};

module.exports = saveReviewsController;
