const UserService = require("../User/UserService");
const Password = require("../Password/Password.js");
const JWT = require("../jwt/JWT");
const signInService = async ({ email, password }) => {
  try {
    // Todo: Check if user exist or not
    const user = await UserService.findByProperty("email", email);
    if (!user) {
      return { error: "User Not Found!" };
    }
    //  Todo: Match Password
    const match = await Password.verify(password, user.password);
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
        name: user.name,
        _id: user._id,
        email: user.email,
        image: user.image.url,
        token: token,
      },
    };
  } catch (err) {
    const e = new Error(err.message);
    e.status(500);
    throw e;
  }
};

module.exports = signInService;
