const router = require('express').Router();
const getAllCategoriesController = require('../../controller/categories/getAllCategoriesController');
router.get('/categories', getAllCategoriesController);

module.exports = router;
