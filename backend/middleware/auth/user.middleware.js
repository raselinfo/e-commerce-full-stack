const JwtService = require('../../service/jwt/JWT');
const UserModel = require('../../model/User');
const Error = require('../../utils/Error');
const adminMiddleware = async (req, _res, next) => {
  console.log('I am in UserMiddleWare');

  try {
    const { authorization } = req.headers;
    const accessToken = authorization?.split('Bearer')[1]?.trim();
    console.log(accessToken);
    if (!accessToken)
      return next(Error.unauthorized('You Need Login Fast!', 403));

    const { _id, role, email } = JwtService.verifyAccessToken(accessToken);
    console.log(email, role);
    //   If role does not match with "USER", "email"
    if (role !== 'USER' || role !== 'ADMIN' || !email)
      return next(Error.unauthorized('You Need Login Fast!', 403));

    // Find User
    const user = await UserModel.findById(_id).exec();

    //   If role does not match with "USER" and other validation
    if (
      !user ||
      user.role !== 'USER' ||
      user.role !== 'ADMIN' ||
      user.email !== email
    )
      return next(Error.unauthorized('You Need Login Fast!', 403));

    //   If All Pass
    return next();
  } catch (err) {
    next(Error.unauthorized(err.message));
  }
};

module.exports = adminMiddleware;
