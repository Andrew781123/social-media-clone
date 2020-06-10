const express = require("express");
const router = express.Router();
const User = require("../model/userDetail");

router.post("/", async (req, res) => {
  const { username, started } = req.body;

  try {
    //check if user already exists
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username has been registered" });
    }

    const newUser = new User({
      username,
      started
    });
    const savedUser = await newUser.save();
    res.status(201).json({ savedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
