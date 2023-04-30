const router = require('express').Router();
const {
  seedProductController,
  seedReviews,
  seedCategoryController,
  seedShippingCharge,
  seedStoreUtils,
  seedCoupon,
} = require('../controller/seed/seedControllers');

router.post('/seedProduct', seedProductController);

router.post('/seedCategories', seedCategoryController);

router.post('/seedReviews', seedReviews);

router.post('/seedShippingCharge', seedShippingCharge);
router.post('/seedStoreUtils', seedStoreUtils);
router.post('/seedCoupon', seedCoupon);

module.exports = router;
