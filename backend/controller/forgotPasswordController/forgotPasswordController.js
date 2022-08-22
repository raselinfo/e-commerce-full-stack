const forGotPasswordLinkService = require("../../service/forgotPasswordServices/forgotPasswordLinkService");
const forGotPasswordController = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Please Provide Valid Email." });
  }
  try {
    const { error = null, message = "" } = await forGotPasswordLinkService(
      email.toLowerCase()
    );
    if (error) {
      return next(error);
    }
    res.status(200).json({ message: message });
  } catch (err) {
    next(err);
  }
};

module.exports = forGotPasswordController;
