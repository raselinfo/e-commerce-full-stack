const getAllProductsController = require("../controller/products/getAllProductsController");
const getSingleProduct = require("../controller/products/getSingleProductController");
const router = require("express").Router();
router.get("/products/:slug",getSingleProduct)
router.get("/products", getAllProductsController);

module.exports = router;
