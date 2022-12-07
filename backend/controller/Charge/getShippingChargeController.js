const getShippingChargeService = require('../../service/charge/getShippingChargeService');
const Error = require('../../utils/Error');
const getShippingChargeController = async (req, res, next) => {
  const { city } = req.query;
  if (!city) return res.status(404).json({ error: 'City Query Not Found!' });
  try {
    const { result, error } = await getShippingChargeService(city);
    console.log('result', result);
    if (error) {
      console.log('error', error);
      return next(Error.severError(error));
    }
    return res.status(200).json({ message: 'OK', data: result });
  } catch (err) {
    return next(err);
  }
};

module.exports = getShippingChargeController;
