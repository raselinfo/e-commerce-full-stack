const UserService = require('../User/UserService');
const Password = require('../Password/Password.js');
const JWT = require('../jwt/JWT');
const sendMail = require('../mail/sendMail');
const Token = require('../../model/Token');
const { BASE_CLIENT_URL } = require('../../config');
const generateTokenAndCookie = require('../../utils/generateTokenAndCookie');
const signInService = async ({ email, password, res }) => {
  try {
    // Todo: Check if user exist or not
    const user = await UserService.findByProperty({
      key: 'email',
      value: email,
    });

    if (!user) {
      return { error: 'User Not Found!' };
    }
    // Todo: Check if user verified
    if (!user.verified) {
      const emailVerifyToken = await JWT.signAccessToken({
        email: user.email,
      });
      // Save Token to Database
      const newToken = await new Token({
        token: emailVerifyToken,
        email: user.email,
      }).save();

      const { accepted } = await sendMail({
        to: newToken.email,
        subject: 'Email Verification',
        html: `<p style="font-size:30px;font-weight:bold">
      ${user.name} Please verify your profile by clicking this link <a href="${BASE_CLIENT_URL}/verify/${newToken.email}/${newToken.token}">Verify</a>
      </p>`,
      });
      if (accepted.length) {
        return {
          error: `${newToken.email} is not verified.Please Check your email for verify`,
        };
      }
    }
    //  Todo: Match Password
    const match = await Password.verify(password, user.local.password);
    if (!match) {
      return { error: 'Password Not Match' };
    }

    const { accessToken } = await generateTokenAndCookie({ res, user });

    return {
      data: {
        token: accessToken,
      },
    };
  } catch (err) {
    const e = new Error(err.message);
    e.status = 500;
    throw e;
  }
};

module.exports = signInService;
