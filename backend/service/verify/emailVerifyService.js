const User = require("../../model/User");
const Token = require("../../model/Token");
const JwtService = require("../jwt/JWT");
const emailVerify = async (userToken, email) => {
  try {
    await JwtService.verify(userToken);
    const isValidUser = await User.findOne({ email });
    const isValidToken = await Token.findOne({ email, token: userToken });
    if (!isValidUser || !isValidToken) {
      return { error: { message: "Not valid email" } };
    }
    isValidUser.verified = true;
    const updatedUser = await isValidUser.save();
    if (updatedUser) {
      const deleteToken = await isValidToken.remove();
      if (deleteToken) return { success: "OK" };
    }
  } catch (err) {
    return { error: { message: err.message } };
  }
};

module.exports = emailVerify;