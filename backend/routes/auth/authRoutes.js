const singUpController = require("../../controller/auth/singUpController");
const signInController = require("../../controller/auth/signInController");
const googlePasswordLessAuth = require("../../controller/auth/googlePasswordLessAuth");

const router = require("express").Router();
const multer = require("multer");

router.post("/auth/signup", multer().none(), singUpController);
router.post("/auth/signin", multer().none(), signInController);
// Google Password less authentication 
router.post("/auth/google/signin",googlePasswordLessAuth)

module.exports = router;
