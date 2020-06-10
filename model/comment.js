const mongoose = require("mongoose");
const userBasicSchema = require("./userBasic");
const likeSchema = require("./like");

const commentSchema = new mongoose.Schema({
  user: userBasicSchema,

  content: {
    type: String,
    required: true
  },

  likes: [likeSchema]
});

commentSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

module.exports = commentSchema;
