const User = require("../../model/SignUp");
const signUP = (user) => {
  return new User({
    name: user.name,
    email: user.email,
    image: user.image,
    password: user.password,
  }).save();
};

module.exports = signUp;
