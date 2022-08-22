const UserService = require("../User/UserService");
const Error = require("../../utils/Error");
const JWT = require("../jwt/JWT");
const { JWT_SECRET, STORE_NAME, BASE_CLIENT_URL } = require("../../config");
const ForgotPassword = require("../../model/ForgotPassword");
const sendMail = require("../mail/sendMail");
const forgotPasswordLinkService = async (email) => {
  try {
    const user = await UserService.findByProperty("email", email);

    // Todo: Check if user exist and verified or not
    if (!user || !user?.verified) {
      return { error: Error.notFound("User Not Found Or User Not Verified") };
    }

    // Todo: Generate Token
    const secret = JWT_SECRET + user.email;
    const token = JWT.sign({ email: user.email, id: user._id }, "15m", secret);

    const newDbToken = await new ForgotPassword({
      email: user.email,
      token: token,
    }).save();
    // Todo: Send mail
    const result = await sendMail({
      to: user.email,
      subject: `${STORE_NAME}: Password Reset`,
      html: `
       <h1> ${user.name} this is your reset password link. Don't share this link with anyone.</h1><br>
      <button><a href="${BASE_CLIENT_URL}/reset/password/${newDbToken.token}">Reset Password</a></button>
      <br>
      <b>${BASE_CLIENT_URL}/reset/password/${newDbToken.token}</b>
      `,
    });
    // Todo: Send Success Message
    if (result.accepted.length) {
      return { message: "Please Check Your Email" };
    }
  } catch (err) {
    return { error: Error.severError(err) };
  }
};

module.exports = forgotPasswordLinkService;
