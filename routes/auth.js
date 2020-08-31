const express = require("express");
const router = express.Router();
const passport = require("passport");
const authroizeUser = require("../middleware/auth");

router.get("/", authroizeUser, (req, res) => {
  if (req.user) return res.status(200).json({ user: req.user });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"]
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  console.log(req.user.username);
  if (typeof req.user.username === "undefined") {
    res.redirect(
      `${process.env.CLIENT_URL}/newUser?id=${req.user._id.toString()}`
    );
  } else {
    res.redirect(`${process.env.CLIENT_URL}`);
  }
});

router.get("/login/success", authroizeUser, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout();

  res.redirect(res.redirect(`${process.env.CLIENT_URL}/auth/login`));
});

module.exports = router;
