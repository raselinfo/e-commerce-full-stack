const UserService = require('../User/UserService');
const User = require('../../model/User');
const JWT = require('../jwt/JWT');
const setCookie = require('../../utils/setCookie');
const createToken = (payload) => {
  return JWT.signAccessToken(payload);
};

const googleSignIn = async ({ email, name, picture, verified, res }) => {
  let token;
  try {
    const existUser = await UserService.findByProperty('email', email);
    if (existUser) {
      existUser.image.public_id = undefined;
      // Create access Token
      token = createToken({
        name: existUser.name,
        email: existUser.email,
        _id: existUser._id,
        image: existUser.image,
        role: existUser.role,
      });

      //  create Refresh token
      const refreshToken = await JWT.signRefreshToken({
        name: existUser.name,
        email: existUser.email,
        _id: existUser._id,
        image: existUser.image,
        role: existUser.role,
      });
      res.cookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 8760 * 60 * 60 * 1000, // 1 year
      });
      return { data: token };
    }
    const newUser = await new User({
      email,
      name,
      image: { url: picture },
      verified: verified,
    }).save();
    newUser.image.public_id = undefined;

    // Create Access token
    token = createToken({
      name: newUser.name,
      email: newUser.email,
      image: newUser.image,
      role: newUser.role,
      _id: newUser._id,
    });

    // Create Refresh Token
    const refreshToken = await JWT.signRefreshToken({
      name: newUser.name,
      email: newUser.email,
      image: newUser.image,
      role: newUser.role,
      _id: newUser._id,
    });

    // Set Cookie
    setCookie({ value: refreshToken, res: res });

    return { data: token };
  } catch (err) {
    return { error: err };
  }
};

module.exports = googleSignIn;
