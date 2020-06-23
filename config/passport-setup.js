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
      console.log(user);
      const tempUser = await TempUser.findOne({ googleId: id });
      if (user) {
<<<<<<< HEAD
        user.isFirst = false;
        await user.save();
        return done(null, user);
      }

      // const newUser = new User({
      //   username: displayName,
      //   googleId: id,
      //   started: "Fri Jun 12 2020 20:43:10 GMT+0800 (Hong Kong Standard Time)"
      // });
      // const savedUser = await newUser.save();

      done(null, id);
=======
        return done(null, user);
      }
      const newUser = await createUser(id);
      console.log("shouldnt here");
      done(null, newUser);
>>>>>>> refactor
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  let user;
  user = await User.findById(id);
  if (!user) {
    user = await TempUser.findById(id);
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
