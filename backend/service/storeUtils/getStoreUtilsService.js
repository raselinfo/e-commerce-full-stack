const StoreUtils = require('../../model/StoreUtils');
// Documentation
// getSToreUtilsService get the query object and send back the store data based on query object from the database.
// if there no query then it's  send back all the store data form the database
const getStoreUtilsService = async (query) => {
  try {
    const newQuery = {};
    for (let key in query) {
      if (query[key] === 'true') {
        newQuery[key] = 1;
      }
    }

    const getStoreUtils = await StoreUtils.findOne({}, { ...newQuery }).select(
      '-updatedAt -createdAt -__v'
    );
    if (!getStoreUtils) {
      throw new Error('Not data found!');
    }
    return { result: getStoreUtils };
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = getStoreUtilsService;
