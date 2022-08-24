const router = require("express").Router();
const resetPassController = require("../../controller/resetPassword/resetPassController");
// Reset Password
router.post("/reset/password/:token", resetPassController);

module.exports = router;
