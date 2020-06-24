const express = require("express");
const router = express.Router();
const { User } = require("../model/user");
const { UserDetail } = require("../model/userDetail");
const { TempUser } = require("../model/tempUser");
const { Post } = require("../model/post");
const { Comment } = require("../model/comment");

//create user
router.post("/", async (req, res) => {
  const { username, userId, headColor, bodyColor } = req.body;
  console.log(headColor, bodyColor);

  try {
    //get tempUser
    const tempUser = await TempUser.findById(userId);
    console.log(tempUser);
    //check if user already exists
    const user = await User.findOne({ username });
    console.log(user);
    if (user) {
      return res.status(400).json({ message: "Username has been registered" });
    }

    const newUser = new User({
      username,
      icon: {
        bodyColor,
        headColor
      },
      googleId: tempUser.googleId
    });
    const savedUser = await newUser.save();

    //create new User in userDetail
    const newUserDetail = new UserDetail({
      user: savedUser._id,
      username,
      icon: {
        bodyColor,
        headColor
      },
      googleId: tempUser.googleId
    });
    await newUserDetail.save();

    await tempUser.remove();

    res.status(201).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/:id", async (req, res) => {
  const { username, icon } = req.body;

  try {
    const user = await User.findById(req.params.id);
    const userDetail = await UserDetail.findOne({ user: req.params.id });

    if (!user || !userDetail)
      return res.status(404).json({ message: "user not found" });

    for (let field in req.body) {
      //to do:  if edit field not in basic_user
      user[field] = req.body[field];
      userDetail[field] = req.body[field];
    }

    const savedUser = await user.save();
    await userDetail.save();

    //update post of that user
    await Post.updateMany(
      { "user._id": req.params.id },
      { "user.username": username, "user.icon": icon }
    );

    //update comments of that user
    await Comment.updateMany(
      { "user._id": req.params.id },
      { "user.username": username, "user.icon": icon }
    );

    res.status(200).json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
