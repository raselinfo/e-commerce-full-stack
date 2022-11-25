const getAllProductsController = require("../controller/products/getAllProductsController");
const getProductBySlugController = require("../controller/products/getProductBySlugController");
const getProductByIdController = require("../controller/products/getProductByIdController");
const router = require("express").Router();
router.get("/products/slug/:slug", getProductBySlugController);
router.get("/products/_id/:_id", getProductByIdController);
router.get("/products", getAllProductsController);

module.exports = router;
