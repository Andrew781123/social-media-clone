const mongoose = require("mongoose");

const { userSchema } = require("./user");

const { commentSchema } = require("./comment");
const moment = require("moment");

const postSchema = new mongoose.Schema(
  {
    user: userSchema,

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
        return Date.now();
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

postSchema.virtual("formattedCreatedAt").get(function () {
  return moment(this.createdAt).format("DD MMM, H:mm");
});

postSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

const Post = mongoose.model("post", postSchema);

module.exports = {
  Post
};
