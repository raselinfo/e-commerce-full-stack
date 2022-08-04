const verifyEmailController = require("../../controller/verify/verifyEmailController");

const router = require("express").Router();

router.get("/verify/email/:token/:email", verifyEmailController);
module.exports = router;
