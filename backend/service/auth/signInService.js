const UserService = require("../User/UserService");
const Password = require("../Password/Password.js");
const JWT = require("../jwt/JWT");
const sendMail = require("../mail/sendMail");
const Token = require("../../model/Token");
const { BASE_CLIENT_URL } = require("../../config");
const signInService = async ({ email, password }) => {
  try {
    // Todo: Check if user exist or not
    const user = await UserService.findByProperty("email", email);
    if (!user) {
      return { error: "User Not Found!" };
    }
    // Todo: Check if user verified
    if (!user.verified) {
      const emailVerifyToken = await JWT.sign({
        email: user.email,
      });
      const newToken = await new Token({
        token: emailVerifyToken,
        email: user.email,
      }).save();

      const { accepted } = await sendMail({
        to: newToken.email,
        subject: "Email Verification",
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
      return { error: "Password Not Match" };
    }
    //  Todo: Access Token
    const token = await JWT.sign(
      {
        name: user.name,
        _id: user._id,
        email: user.email,
        role: user.role,
        image: user.image.url,
      },
      "365d"
    );

    return {
      data: {
        token: token,
      },
    };
  } catch (err) {
    const e = new Error(err.message);
    e.status = 500;
    throw e;
  }
};

module.exports = signInService;
