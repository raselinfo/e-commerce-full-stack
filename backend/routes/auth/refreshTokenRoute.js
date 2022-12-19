const router = require('express').Router();
const refreshTokenController = require('../../controller/auth/refreshTokenController');
router.post('/refresh-token', refreshTokenController);

module.exports = router;
