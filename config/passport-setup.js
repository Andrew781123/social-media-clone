const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../model/user");
const { TempUser } = require("../model/tempUser");

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "/api/auth/google/redirect",
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret
    },
    async (accessToken, refreshTocken, profile, done) => {
      const { id, displayName } = profile;

      const user = await User.findOne({ googleId: id });
      const tempUser = await TempUser.findOne({ googleId: id });
      if (user) {
        return done(null, user);
      }
      if (tempUser) {
        return done(null, tempUser);
      }
      const newUser = await createUser(id);
      done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

passport.deserializeUser(async (id, done) => {
  let user;
  user = await User.findOne({ googleId: id });
  if (!user) {
    user = await TempUser.findOne({ googleId: id });
  }
  done(null, user);
});

const createUser = async googleId => {
  const newTempUser = new TempUser({
    googleId
  });

  const savedTempUser = await newTempUser.save();
  return savedTempUser;
};
