const JWT = require('../../service/jwt/JWT');
const User = require('../../model/User');
const refreshTokenController = async (req, res, next) => {
  let { refreshToken } = req.cookies;
  refreshToken = refreshToken?.trim();

  if (!refreshToken) return res.status(403).json({ message: 'Please Login' });
  let tokenUser;
  try {
    tokenUser = await JWT.verifyRefreshToken(refreshToken);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
  console.log('Token User id', tokenUser);
  // Validate User
  try {
    const user = await User.findById(tokenUser._id);
    if (!user && user.email !== tokenUser.email)
      return res.status(403).json({ message: 'Please Login' });

    console.log('user', user);
    // Create Access Token
    const accessToken = JWT.signAccessToken({
      name: user.name,
      _id: user._id,
      email: user.email,
      role: user.role,
      image: user.image.url,
    });

    // Create Refresh Token
    const refreshToken = JWT.signRefreshToken({
      name: user.name,
      _id: user._id,
      email: user.email,
      role: user.role,
      image: user.image.url,
    });
    // Set Cookie
    res.cookie('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 8760 * 60 * 60 * 1000, // 1 year
    });

    return res
      .status(200)
      .json({ message: 'Ok', data: { accessToken, refreshToken } });
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

module.exports = refreshTokenController;
