const { CLIENT_ID, CLIENT_SECRET, CALLBACK_URL } = require("../../config");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../model/User");
passport.use(
  new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
  }),
  async (_, _, profile, cb) => {
    try {
      console.log(profile);
      //     const user=await new User({
      //         name:"",

      //     })

      //   cb(null, user);
    } catch (err) {
      cb(err);
    }
  }
);

// Passport Serialize and deserialize
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
