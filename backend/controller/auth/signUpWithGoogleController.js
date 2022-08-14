const passport = require("passport");
const { BASE_CLIENT_URL } = require("../../config");
const User = require("../../model/User");
const Error = require("../../utils/Error");
const googleController = () => {
  return passport.authenticate("google", {
    scope: ["email", "profile"],
  });
};
const signUpWithGoogleController = (req, res, next) => {
  passport.authenticate(
    "google",
    {
      failureRedirect: `${BASE_CLIENT_URL}/signup`,
      successRedirect: `/api/v1/auth/login/success`,
      failureFlash: true,
    },
    (err, user, info) => {
      console.log("error", err);
      console.log("user", user);
      console.log("info", info);
      if (err) {
        return res.redirect(`${BASE_CLIENT_URL}/signup`);
      }
      if (user) {
        return res.redirect(
          `/api/v1/auth/login/success/?email=${user.email}&redirect=true`
        );
      }
    }
  )(req, res, next);
};
// Sign in Success
const googleSignUpSuccessController = async (req, res, next) => {
  const { email, redirect } = req.query;

  try {
    if (!email) {
      return next(Error.notFound());
    }
    const user = await User.findOne({ email });

    if (!user) {
      return next(Error.notFound());
    }
    console.log("Ok........")
    if (redirect) {
      return res.redirect(`${BASE_CLIENT_URL}/?email=${email}`);
    }
    return res.status(200).json({ message: "success", data: user });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signUpWithGoogleController,
  googleController,
  googleSignUpSuccessController,
};
