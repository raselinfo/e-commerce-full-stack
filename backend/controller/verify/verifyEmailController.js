const emailVerifyService = require("../../service/verify/emailVerifyService");
const verifyEmailController = async (req, res, next) => {
  try {
    const { token, email } = req.params;
    const { error, success } = await emailVerifyService(token, email);
    if (error?.message) {
      return res.status(501).json({ message: error });
    }
    if(success){

    }
    res.status(200).json({ message: "Email Verify Successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = verifyEmailController;
