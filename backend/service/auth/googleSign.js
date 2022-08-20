const UserService = require("../User/UserService");
const User = require("../../model/User");
const JWT = require("../jwt/JWT");

const createToken = (payload) => {
  return JWT.sign(payload, "365d");
};

const googleSignIn = async ({ email, name, picture, verified }) => {
  let token;
  try {
    const existUser = await UserService.findByProperty("email", email);
    if (existUser) {
      existUser.image.public_id = undefined;
      token = createToken({
        name: existUser.name,
        email: existUser.email,
        id: existUser._id,
        image: existUser.image,
        role: existUser.role,
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

    token = createToken({
      name: newUser.name,
      email: newUser.email,
      image: newUser.image,
      role: newUser.role,
      id: newUser._id,
    });

    return { data: token };
  } catch (err) {
    return { error: err };
  }
};

module.exports = googleSignIn;