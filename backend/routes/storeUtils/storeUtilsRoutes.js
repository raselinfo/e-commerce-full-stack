const router = require('express').Router();
const setStoreUtilsController = require('../../controller/storeUtils/setStoreUtilsController');
const getStoreUtilsController = require('../../controller/storeUtils/getStoreUtilsController');

const adminMiddleware = require('../../middleware/auth/admin.middleware');
const authenticationMiddleware = require('../../middleware/auth/authentication.middleware');

router.post(
  '/setStoreUtils',
  [authenticationMiddleware, adminMiddleware],
  setStoreUtilsController
);
router.get('/getStoreUtils', getStoreUtilsController);
module.exports = router;
