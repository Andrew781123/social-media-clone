const mongoose = require("mongoose");
const { userIconSchema } = require("./user");

const userDetailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },

  username: {
    type: String,
    required: true
  },

  icon: userIconSchema,

  googleId: {
    type: String,
    required: true
  },

  joined: {
    type: Date,
<<<<<<< HEAD
    get: getExperience
=======
    default: () => new Date()
>>>>>>> refactor
  },

  isFirst: {
    type: Boolean,
    default: true
  }
});

const UserDetail = mongoose.model("user_detail", userDetailSchema);

module.exports = {
  UserDetail
};
