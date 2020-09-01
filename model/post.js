const mongoose = require("mongoose");

const { userSchema } = require("./user");

const { commentSchema } = require("./comment");
const { Comment } = require("./comment");
const moment = require("moment");

const postSchema = new mongoose.Schema(
  {
    user: userSchema,

    content: {
      type: String,
      required: true
    },

    imageURL: {
      type: String
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

    priority: {
      type: Number,
      default: 0
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
  let displayTime = this.createdAt;
  if (moment(this.createdAt).utcOffset() == -0) {
    // for server
    displayTime = moment(this.createdAt).add(8, "h");
  }
  return moment(displayTime).format("DD MMM, H:mm");
});

postSchema.virtual("likeCount").get(function () {
  return this.likes.length;
});

postSchema.pre("remove", async function (next) {
  try {
    const comments = await Comment.find({ post: this._id });
    if (comments.length > 0) {
      for (const comment of comments) {
        await comment.remove();
      }
    }
    next();
  } catch (err) {
    console.error(err);
  }
});

const Post = mongoose.model("post", postSchema);

module.exports = {
  Post
};
