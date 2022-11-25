const forGotPasswordController = require("../../controller/forgotPasswordController/forgotPasswordController");

const router = require("express").Router();

// Todo: Request to get reset link for forgot password
router.post("/forgot/password", forGotPasswordController);

module.exports = router;
