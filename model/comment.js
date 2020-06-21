const mongoose = require("mongoose");
const { userSchema } = require("./user");

const commentSchema = new mongoose.Schema({
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
});

commentSchema.virtual("formattedCreatedAt").get(function () {
  return moment(this.createdAt).format("DD MMM, H:mm");
});

const Comment = mongoose.model("comment", commentSchema);

module.exports = {
  Comment,
  commentSchema
};
