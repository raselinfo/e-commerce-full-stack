const signInService = require("../../service/auth/signInService");
const Error = require("../../utils/Error");
const signInController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
   
    const { token, error } = await signInService({ email, password });
    console.log("token",token)
    console.log("error",error)
    if (error) {
      return res.status(401).json({
       ...Error.unauthorized(error)
      });
    }
    res.status(202).json({
      message: "Success",
      data: {
        token: token,
      },
    });
  } catch (err) {
    next(err);
  }
};
module.exports = signInController;
