const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Post } = require("../model/post");
const { User } = require("../model/user");

const { Comment } = require("../model/comment");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).exec();
    //sort comments

    //get commentCount
    let commentCount = 0;
    let postReturn = [];
    for (const post of posts) {
      const postObject = post.toObject();
      commentCount = await Comment.getCommentCount(post._id);
      postReturn.push({ ...postObject, commentCount });
    }

    res.status(200).json(postReturn);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/", async (req, res) => {
  const { user, content, isPublic } = req.body;

  try {
    //create new post
    const newPost = new Post({
      user,
      content,
      isPublic
    });
    //shift and push to user

    //save
    const savedPost = await newPost.save();
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
  const { userId } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    post.likes.push(userId);
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/:id/likes/decrement", async (req, res) => {
  const { userId } = req.body;

  try {
    const post = await Post.findById(req.params.id);

    const newLikes = post.likes.filter(_id => _id.toString() !== userId);
    post.likes = newLikes;
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

//get comments of a post
router.get("/:id/comments", async (req, res) => {
  const { skip, num } = req.query;
  const skipNum = +skip;
  const commentNum = +num;

  try {
    const comments = await Comment.find({ post: req.params.id })
      .skip(skipNum)
      .limit(commentNum)
      .exec();

    //sort the comments

    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

//create comment
router.post("/:id/comments", async (req, res) => {
  const { user, content } = req.body;
  const newComment = new Comment({
    post: req.params.id,
    user,
    content
  });

  try {
    //save to comment collection
    const savedComment = await newComment.save();

    //shift and push comment to post
    const post = await Post.findById(req.params.id);
    if (post.comments.length === 3) post.comments.shift();
    post.comments.push(savedComment);
    await post.save();

    res.status(201).json(savedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
