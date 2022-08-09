const singUpController = require("../../controller/auth/singUpController");
const signInController = require("../../controller/auth/signInController");
const router = require("express").Router();
const multer = require("multer");
router.post("/auth/signup", multer().none(), singUpController);
router.post("/auth/signin", multer().none(), signInController);

module.exports = router;
