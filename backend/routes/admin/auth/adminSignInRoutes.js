const router = require('express').Router();
const adminSignInController = require('../../../controller/admin/auth/adminSigninController');
const multer = require('multer');

router.post('/admin-signin', multer().none(), adminSignInController);
module.exports = router;
