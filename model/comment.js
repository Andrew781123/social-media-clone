const mongoose = require("mongoose");
const likeSchema = require("./like");
const moment = require("moment");
const { userSchema } = require("./userDetail");

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post"
  },

  user: userSchema,

  content: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: () => {
      return Date.now();
    }
  },

  likes: [likeSchema]
});

commentSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

commentSchema.virtual("formattedCreatedAt").get(function () {
  return moment(this.createdAt).format("DD MMM, H:mm");
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = {
  Comment,
  commentSchema
};
