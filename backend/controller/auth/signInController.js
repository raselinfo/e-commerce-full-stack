const signInController = (req, res, next) => {
  const {email,password} = req.body;
  console.log(req.body)
};
module.exports = signInController;
