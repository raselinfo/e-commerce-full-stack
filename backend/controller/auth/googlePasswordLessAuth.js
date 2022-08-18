const googleSign = require("../../service/auth/googleSign");
const Error = require("../../utils/Error");
const googlePasswordLessAuth = async (req, res, next) => {
  try {
    const { email, name, picture, verified } = req.body;
    const { error = null, data = null } = await googleSign({
      email,
      name,
      picture,
      verified,
    });
    if (error) {
      return next(error);
    }
    res.status(200).json({ message: "success", data: data });
  } catch (err) {
    return next(Error.severError(err));
  }
};
module.exports = googlePasswordLessAuth;
