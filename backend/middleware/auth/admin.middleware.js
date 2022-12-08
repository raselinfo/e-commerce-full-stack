const JwtService = require('../../service/jwt/JWT');
const UserModel = require('../../model/User');
const Error = require('../../utils/Error');
const { ADMIN_EMAIL } = require('../../config');
const adminMiddleware = async (req, _res, next) => {
  try {
    const { token } = req.headers;
    const { _id, role, email } = JwtService.verify(token);
    //   If role does not match with "ADMIN", "email"
    if (role !== 'ADMIN' || email !== ADMIN_EMAIL.trim())
      return next(Error.unauthorized());

    // Find User
    const user = await UserModel.findById(_id).exec();

    //   If role does not match with "ADMIN" and other validation
    if (
      !user ||
      user.role !== 'ADMIN' ||
      user.email !== email ||
      user.email !== ADMIN_EMAIL.trim()
    )
      return next(Error.unauthorized());

    console.log('hi');
    //   If All Pass
    next();
  } catch (err) {
    next(Error.severError(err.message));
  }
};

module.exports = adminMiddleware;
