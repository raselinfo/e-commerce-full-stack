const verifyEmailController = require("../../controller/verify/verifyEmailController");

const router = require("express").Router();

router.get("/verify/email/:email/:token", verifyEmailController);
module.exports = router;
