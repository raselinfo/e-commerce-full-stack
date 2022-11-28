const Joi = require("joi");
const Error = require("../../utils/Error");
const JWT = require("../jwt/JWT");
const { JWT_SECRET } = require("../../config");
const UserService = require("../User/UserService");

const Password = require('../Password/Password.js');

const ForgotPassword = require("../../model/ForgotPassword");
const resetPassService = async ({
  password,
  confirm_password,
  token,
  email,
}) => {
  try {
    // Todo: Password Validation
    const passwordSchema = Joi.object({
      password: Joi.string().min(8).required(),
      confirm_password: Joi.any().valid(Joi.ref("password")).required(),
      email: Joi.string().email().lowercase().required(),
    });

    const { error } = passwordSchema.validate({
      password,
      confirm_password,
      email,
    });
    if (error) return { error };

    // Todo: Verify Token
    const secret = JWT_SECRET + email;
    const userToken = JWT.verify(token, secret);

    // Todo: Check if the user exist or not
    const existUser = await UserService.findByProperty("id", userToken.id);
    if (!existUser) return { error: "User Not Found" };
    // Todo: Save new Password
    existUser.local.password = await Password.hash(password);
    existUser.save();
    // Delete Forgot Token
    await ForgotPassword.deleteMany({ email: existUser.email });
    // Todo: Return Success Message
    return { result: "Password Change Success" };
  } catch (error) {
    return { error };
  }
};
module.exports = resetPassService;
