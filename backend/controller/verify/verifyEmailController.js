const verifyEmailController = (req, res, next) => {
  const { token, email } = req.params;


  res.send("Successfully")
};

module.exports = verifyEmailController;
