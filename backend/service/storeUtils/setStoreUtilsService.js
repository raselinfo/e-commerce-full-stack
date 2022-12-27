const StoreUtils = require('../../model/StoreUtils');
// Documentation
// this setStoreUtilsService get the store utils data form controller and save the on database
const setStoreUtilsService = async (value) => {
  try {
    // Save store utils on database value=> {storeName,tax}
    const saveStoreUtils = new StoreUtils({
      storeName: value.storeName,
      tax: value.tax,
    });
    const data = await saveStoreUtils.save();
    return { result: data };
  } catch (err) {
    throw new Error(err.message);
  }
};
module.exports = setStoreUtilsService;
