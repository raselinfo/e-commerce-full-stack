const JwtService = require('../../service/jwt/JWT');
const UserModel = require('../../model/User');
const authenticationMiddleware = async (req, res, next) => {
  let { refreshToken } = req.cookies;
  refreshToken = refreshToken?.trim();

  //   if no refresh token
  if (!refreshToken)
    return res.status(403).json({ message: 'Please Login/Sign UP' });

  // Verify Token
  let user;
  try {
    user = await JwtService.verifyRefreshToken(refreshToken);
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: err.message });
  }

  //   Find User
  try {
    const findUser = await UserModel.findById(user._id);
    if (!findUser && findUser.email !== user.email)
      return res.status(404).json({ message: 'Please Login/Sign UP' });
    return next();
  } catch (err) {
    return res.status(404).json({ message: 'please Login/Sign UP' });
  }
};
module.exports = authenticationMiddleware;
