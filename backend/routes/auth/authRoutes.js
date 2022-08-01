const singUpController = require("../../controller/auth/singUpController");
const router = require("express").Router();

router.post('/auth/signup',singUpController)


module.exports = router;
