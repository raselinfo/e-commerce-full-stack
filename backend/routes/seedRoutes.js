const router = require("express").Router();
const {
  seedProductController,
  seedReviews,
  seedCategoryController,
} = require("../controller/seed/seedControllers");
router.post("/seedProduct", seedProductController);

router.post("/seedCategories", seedCategoryController);

router.post("/seedReviews", seedReviews);

module.exports = router;
