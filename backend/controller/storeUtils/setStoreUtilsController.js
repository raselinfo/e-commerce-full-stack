const JOI = require('joi');
const setStoreUtilsService = require('../../service/storeUtils/setStoreUtilsService');
// Documentation
// this setStorUtilsController get the store utils data form the admin and save the store utils data
const setStoreUtilsController = async (req, res, next) => {
  try {
    const joiValidationSchema = JOI.object({
      storeName: JOI.string().required(),
      tax: JOI.number().required(),
    });

    const { error, value } = joiValidationSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    //  setStoreUtilsService value = {storeName,tax}
    const { data } = await setStoreUtilsService(value);
    console.log('result', data);
    return res.status(201).json({ message: 'Success', data: data });
  } catch (err) {
    return next(err);
  }
};

module.exports = setStoreUtilsController;
