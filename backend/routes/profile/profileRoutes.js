const router = require('express').Router();
const authenticationMiddleware = require('../../middleware/auth/authentication.middleware');
const updateProfileController = require('../../controller/profile/updateProfileController');
router.put('/profile', authenticationMiddleware, updateProfileController);

module.exports = router;
