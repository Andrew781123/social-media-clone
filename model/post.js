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
      type: Date,
      default: () => {
        return moment(new Date()).format("DD MMM");
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
  { toObject: { depopulate: true } }
);

postSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

module.exports = mongoose.model("post", postSchema);
