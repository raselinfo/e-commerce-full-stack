const JwtService = require('../../service/jwt/JWT');
const UserModel = require('../../model/User');
const Error = require('../../utils/Error');
const adminMiddleware = async (req, _res, next) => {
  try {
    const { token } = req.headers;
    const { _id, role, email } = JwtService.verify(token);
    //   If role does not match with "USER", "email"
    if (role !== 'USER' || !email)
      return next(Error.unauthorized('You Need Login Fast!'));

    // Find User
    const user = await UserModel.findById(_id).exec();

    //   If role does not match with "USER" and other validation
    if (!user || user.role !== 'USER' || user.email !== email)
      return next(Error.unauthorized('You Need Login Fast!'));

    //   If All Pass
    next();
  } catch (err) {
    next(Error.severError(err.message));
  }
};

module.exports = adminMiddleware;
