const signInService = require("../../service/auth/signInService");
const Error = require("../../utils/Error");
const signInController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { data, error } = await signInService({ email, password });

    if (error) {
      return res.status(401).json({
        ...Error.unauthorized(error),
      });
    }
    res.status(202).json({
      message: "Success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = signInController;