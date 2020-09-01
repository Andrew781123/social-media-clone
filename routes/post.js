const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { Post } = require("../model/post");

const { Comment } = require("../model/comment");
const multer = require("multer");
const path = require("path");
const getRelativePath = require("../utils/getRelativePath");
const fs = require("fs");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ priority: -1, createdAt: -1 })
      .exec();
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
  const upload = multer({
    dest: path.resolve(__dirname, "../public/posts/images")
  }).single("image");

  upload(req, res, async err => {
    const { user, content, isPublic } = req.body;

    if (content === "")
      return res.status.json({ message: "Description cannot be empty" });

    if (err) {
      return res.status(500).json({ message: "Cannot save Image" });
    }

    let relativePath;
    if (req.file) {
      const imagePath = req.file.path;
      relativePath = getRelativePath(imagePath);
    }

    try {
      //create new post
      const newPost = new Post({
        user: JSON.parse(user),
        content,
        imageURL: relativePath || null,
        isPublic: JSON.parse(isPublic)
      });
      //shift and push to user

      //save
      const savedPost = await newPost.save();
      const postObject = savedPost.toObject();
      res.status(201).json({ ...postObject, commentCount: 0 });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error" });
    }
  });
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

    //remove image
    const imageURL = post.imageURL;
    if (imageURL) {
      fs.unlinkSync(path.resolve(__dirname, `../${imageURL}`));
    }

    await post.remove();
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/:id/likes", async (req, res) => {
  const { userId } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    switch (req.query.type) {
      case "increment": {
        post.likes.push(userId);
        break;
      }
      case "decrement": {
        post.likes = post.likes.filter(_id => _id.toString() !== userId);
        break;
      }
    }

    const savedPost = await post.save();

    const { likes, likeCount } = savedPost;

    res.status(201).json({ postId: post._id, likes, likeCount });
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
