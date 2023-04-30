const { setCookie } = require('./setCookie');
const JWT = require('../service/jwt/JWT');

// Documentation
// This generateTokenAndCookie function basically set Cookie with refreshToken in the cookie. And set accessToken and refreshToken

const generateTokenAndCookie = async ({ res, user }) => {
  try {
    const newUser = {
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      _id: user._id,
    };

    // Create AccessToken
    const accessToken = await JWT.signAccessToken(newUser);

    //   Create Refresh Token
    const refreshToken = await JWT.signRefreshToken(newUser);
    const result = setCookie({ res: res, value: refreshToken });

    if (result) {
      return { accessToken, refreshToken };
    } else {
      throw new Error('No Cookie set');
    }
  } catch (err) {
    return { error: err.message };
  }
};

module.exports = generateTokenAndCookie;
