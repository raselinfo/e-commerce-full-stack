const getAllProductsController = require("../controller/products/getAllProductsController");
const router = require("express").Router();
router.get("/products", getAllProductsController);

module.exports = router;
