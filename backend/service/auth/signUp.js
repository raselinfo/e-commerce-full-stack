const User = require("../../model/SignUp");
/**
 *
 * @param {{name,email,image,password}} user
 * @returns User Data
 */
const signUp = (user) => {
  return new User({
    name: user.name,
    email: user.email,
    image: user.image,
    password: user.password,
  }).save();
};

module.exports = signUp;
