const signInService = require('../../service/auth/signInService');
const Error = require('../../utils/Error');
const signInController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await signInService({ email, password, res });

    if (error) {
      return res.status(401).json({
        ...Error.unauthorized(error),
      });
    }

    console.log('check cookie', res);
    return res.cookie('test-cookie', 'test sample', {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 8760 * 60 * 60 * 1000, // 1 year,
        secure: true,
        // signed: true,
      }).status(202)
      .json({
        message: 'Success',
        data,
      })
      
  } catch (err) {
    next(err);
  }
};
module.exports = signInController;
