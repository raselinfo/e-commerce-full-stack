const verifyEmailController = require("../../controller/verify/verifyEmailController");

const router = require("express").Router();

router.post("/verify/email/:token/:email", verifyEmailController);
module.exports = router;
