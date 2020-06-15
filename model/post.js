const mongoose = require("mongoose");
const commentSchema = require("./comment");
const userBasicSchema = require("./userBasic");
const likeSchema = require("./like");
const moment = require("moment");

const postSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true
    },

    content: {
      type: String,
      required: true
    },

    isPublic: {
      type: Boolean,
      required: true
    },

    createdAt: {
      type: String,
      default: () => {
        return moment(Date.now()).format("DD MMM");
      }
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userDetail"
      }
    ],

    comments: [commentSchema]
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

postSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

module.exports = mongoose.model("post", postSchema);
