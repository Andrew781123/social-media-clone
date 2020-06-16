const mongoose = require("mongoose");

function getExperience(started) {
  const start = started;
  const now = new Date();
  return start.diff(now, "years");
}

const userDetailSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  headColor: {
    type: String,
    default: "white"
  },

  bodyColor: {
    type: String,
    default: "blue"
  },

  googleId: {
    type: String,
    required: true
  },

  started: {
    type: Date,
    required: true,
    get: getExperience
  },

  isFirst: {
    type: Boolean,
    default: true
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ]
});

module.exports.userSchema = userDetailSchema;

module.exports.User = mongoose.model("userDetail", userDetailSchema);
