const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const User = require("../model/userDetail");

router.post("/", async (req, res) => {
  const { user, content } = req.body;

  try {
    const newPost = new Post({
      user,
      content
    });
    const author = await User.findOne({ username: user.username });
    const savedPost = await newPost.save();
    //push new post to user
    author.posts.push(savedPost);

    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findOneById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.remove();
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
