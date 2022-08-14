const singUpController = require("../../controller/auth/singUpController");
const signInController = require("../../controller/auth/signInController");
const {
  signUpWithGoogleController,
  googleController,
  googleSignUpSuccessController,
} = require("../../controller/auth/signUpWithGoogleController");
const router = require("express").Router();
const multer = require("multer");

router.post("/auth/signup", multer().none(), singUpController);
router.post("/auth/signin", multer().none(), signInController);

// Todo: Google SignUP
router.get("/auth/login/success", googleSignUpSuccessController);
router.get("/auth/google", googleController());
router.get("/auth/google/callback", signUpWithGoogleController);

module.exports = router;
