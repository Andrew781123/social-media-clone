const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const User = require("../model/userDetail");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  const { username, content, isPublic } = req.body;

  try {
    const newPost = new Post({
      username,
      content,
      isPublic
    });
    const author = await User.findOne({ username });
    const savedPost = await newPost.save();
    //push new post to user
    author.posts.push(savedPost);

    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    for (let field in req.body) {
      post[field] = req.body[field];
    }

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
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

router.post("/:id/likes/increment", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.body.userId);

    post.likes.push(user._id);
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/:id/likes/decrement", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.body.userId);

    const newLikes = post.likes.filter(
      _id => _id.toString() !== user._id.toString()
    );
    post.likes = newLikes;
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await Post.findById(req.params.id)
      .populate("comments")
      .select("comments")
      .exec();
    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/:id/comments", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const newComment = {
      username: req.body.username,
      content: req.body.content
    };
    post.comments.push(newComment);
    await post.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
