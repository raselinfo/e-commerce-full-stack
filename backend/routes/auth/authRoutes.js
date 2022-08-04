const singUpController = require("../../controller/auth/singUpController");
const router = require("express").Router();
const multer = require("multer");
router.post("/auth/signup", multer().none(), singUpController);

module.exports = router;
