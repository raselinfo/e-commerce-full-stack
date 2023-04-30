const router = require('express').Router();
const searchController = require('../../controller/search/searchController.js');

router.get('/search', searchController);

module.exports = router;
