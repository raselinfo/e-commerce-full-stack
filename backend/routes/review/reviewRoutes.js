const router = require('express').Router();
const authenticationMiddleware = require('../../middleware/auth/authentication.middleware');
const saveReviewsController = require('../../controller/review/saveReviewsController');
router.route('/reviews').post(authenticationMiddleware, saveReviewsController);

module.exports = router;
