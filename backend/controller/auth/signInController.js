const signInService = require('../../service/auth/signInService');
const Error = require('../../utils/Error');
const signInController = async (req, res, next) => {
  console.log('Cookies', req.cookies);
  try {
    const { email, password } = req.body;
    const { data, error } = await signInService({ email, password, res });

    if (error) {
      return res.status(401).json({
        ...Error.unauthorized(error),
      });
    }

    console.log('check cookie', res);
    return res
      .status(202)
      .json({
        message: 'Success',
        data,
      })
      .cookie('test-cookie', 'test sample', {
        httpOnly: true,
        maxAge: 8760 * 60 * 60 * 1000, // 1 year,
      });
  } catch (err) {
    next(err);
  }
};
module.exports = signInController;
