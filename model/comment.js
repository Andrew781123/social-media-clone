const mongoose = require("mongoose");
const { userSchema } = require("./user");
const moment = require("moment");

const commentSchema = new mongoose.Schema(
  {
    user: userSchema,

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post"
    },

    content: {
      type: String,
      required: true
    },

    createdAt: {
      type: Date,
      default: () => {
        return Date.now();
      }
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

commentSchema.virtual("formattedCreatedAt").get(function () {
  return moment(this.createdAt).format("DD MMM, H:mm");
});

commentSchema.statics.getCommentCount = async function (postId) {
  const comments = await this.find({ post: postId });
  return comments.length;
};

const Comment = mongoose.model("comment", commentSchema);

module.exports = {
  Comment,
  commentSchema
};
