const JWT = require('../../service/jwt/JWT');
const User = require('../../model/User');
const generateTokenAndCookie = require('../../utils/generateTokenAndCookie');
const refreshTokenController = async (req, res, next) => {
  console.log('refreshTokenController');

  let { refreshToken } = req.cookies;
  refreshToken = refreshToken?.trim();
  if (!refreshToken) return res.status(403).json({ message: 'Please Login' });
  let tokenUser;
  try {
    tokenUser = await JWT.verifyRefreshToken(refreshToken);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }

  // Validate User
  try {
    const user = await User.findById(tokenUser._id);

    if (!user && user.email !== tokenUser.email) {
      return res.status(403).json({ message: 'Please Login' });
    }
    // Get Access Token and set Cookie with refresh token
    const { accessToken, refreshToken } = await generateTokenAndCookie({
      res,
      user,
    });

    return res.status(200).json({ message: 'Ok', data: { accessToken } });
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

module.exports = refreshTokenController;
