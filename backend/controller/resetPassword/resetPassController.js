const resetPassService = require('../../service/resetPassService/resetPassService');
const Error = require('../../utils/Error');
const resetPassController = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password, confirm_password, email } = req.body;

    const { error = null, result } =
      (await resetPassService({
        password,
        confirm_password,
        token,
        email,
      })) || {};

    if (error) {
      return next(error);
    }
    return res.status(200).json({ message: 'Successful', data: result });
  } catch (err) {
    next(Error.severError(err));
  }
};
module.exports = resetPassController;
