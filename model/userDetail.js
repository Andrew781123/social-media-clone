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

  googleId: {
    type: String,
    required: true
  },

  started: {
    type: Date,
    required: true,
    get: getExperience
  },

  posts: [
    {
      type: mongoose.Schema.Types.ObjectId
    }
  ]
});

module.exports = mongoose.model("userDetail", userDetailSchema);
