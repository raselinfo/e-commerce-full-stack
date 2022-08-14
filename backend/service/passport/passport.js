const {
  CLIENT_ID,
  CLIENT_SECRET,
  CALLBACK_URL,
  SERVER_URL,
} = require("../../config");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../../model/User");
const UserService = require("../User/UserService");
console.log(`${SERVER_URL}/api/v1${CALLBACK_URL}`);
passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: `${SERVER_URL}/api/v1${CALLBACK_URL}`,
    },
    async (_accessToken, _refreshToken, profile, cb) => {
      try {
        if (!profile) return cb(null, false, { message: "Profile Not Found" });
        // Check if user exist or not
        const existUser = await UserService.findByProperty(
          "email",
          profile.emails[0].value
        );
        if (existUser) {
          return cb(null, existUser);
        }
        const user = await new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value,
          ["google.googl_id"]: profile.id,
          verified: profile.emails[0].verified,
        }).save();
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// Passport Serialize and deserialize
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
