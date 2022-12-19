const router = require('express').Router();
const logoutController = require('../../controller/auth/logoutController');

router.post('/logout', logoutController);

module.exports = router;
