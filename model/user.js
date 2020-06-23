const mongoose = require("mongoose");

const userIconSchema = new mongoose.Schema({
  bodyColor: {
    type: String,
    default: "blue"
  },

  headColor: {
    type: String,
    default: "orange"
  }
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  googleId: {
    type: String,
    required: true
  },

  icon: userIconSchema
});

const User = mongoose.model("user", userSchema);

module.exports = {
  User,
  userIconSchema,
  userSchema
};
