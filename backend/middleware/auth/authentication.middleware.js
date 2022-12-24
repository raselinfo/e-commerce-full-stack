const JWT = require('../../service/jwt/JWT');
const UserService = require('../../service/User/UserService.js');

// Documentation
// This authenticationMiddleware middleware function check is client sent his request with valid accessToken in the headers. and it's also check is there cookie available or not. It's also do some token verification task.

const authenticationMiddleware = async (req, res, next) => {
  // is there an access token in header (not=> 403)
  // check access token validation (not=> 403)
  // check user exist or not in the database (not=> 403)
  // check access token role,email and database user role,email (not=>403)
  // if all the test pass then return next()
  console.log('authenticationMiddleware');

  try {
    // Access token from header
    const { authorization } = req.headers;
    const accessToken = authorization?.split('Bearer')[1]?.trim();
    //  Refresh Token from req.cookies
    let { refreshToken } = req.cookies;
    refreshToken = refreshToken?.trim();

    // if not access token
    if (!refreshToken) {
      return res.status(403).json({ message: 'Pleas login first' });
    }
    // Token verify
    const { _id, email, role, name } = await JWT.verifyAccessToken(accessToken);

    const findUser = await UserService.findByProperty('id', _id);
    // if no found user
    if (!findUser) {
      return res.status(401).json({ message: 'UnAuthorize' });
    }
    // if user details not match
    if (
      findUser.email !== email ||
      findUser.role !== role ||
      findUser.name !== name
    ) {
      return res.status(401).json({ message: 'UnAuthorize' });
    }

    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
module.exports = authenticationMiddleware;
