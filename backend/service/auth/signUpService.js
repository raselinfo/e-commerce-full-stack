const User = require('../../model/User');
const UserService = require('../User/UserService');
const sendMail = require('../mail/sendMail');
const { BASE_CLIENT_URL } = require('../../config');
const Token = require('../../model/Token');
const JwtService = require('../jwt/JWT');
const uploadImage = require('../../utils/imageHandler');
const Password = require('../Password/Password.js');
/**
 *
 * @param {{name,email,image,password}} user
 * @returns User Data
 */
const signUp = async (user) => {
  try {
    const existUser = await UserService.findByProperty({
      key: 'email',
      value: user.email,
    });
    if (existUser) {
      return { existUser: true };
    }
    // Todo:  Hash Password
    const hasPassword = await Password.hash(user.password);
    // Todo: Token Generate
    const token = JwtService.signAccessToken({ email: user.email }, '1d');
    const newToken = await new Token({
      email: user.email,
      token: token,
    }).save();
    // Todo:Send mail
    const result = await sendMail({
      to: newToken.email,
      subject: 'Email Verification',
      html: `<p style="font-size:30px;font-weight:bold">
      ${user.name} Please verify your profile by clicking this link <a href="${BASE_CLIENT_URL}/verify/${newToken.email}/${newToken.token}">Verify</a>
      </p>`,
    });
    // Todo:Save user to database
    if (result.accepted.length) {
      // Todo: Create Uer Image URL
      const imageResult = await uploadImage(
        user.image,
        user.email.split('@')[0]
      );
      // Todo: Save user in database
      const newUser = new User({
        name: user.name,
        email: user.email,
        image: { url: imageResult.url, public_id: imageResult.public_id },
        ['local.password']: hasPassword,
      });
      const savedUser = await newUser.save();
      console.log(savedUser);
      return { user: savedUser };
    } else {
      return { error: 'Email Not Send' };
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = signUp;
