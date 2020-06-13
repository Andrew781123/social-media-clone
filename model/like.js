const mongoose = require("mongoose");
const userBasicSchema = require("./userBasic");

const likeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },

  likes: {
    type: Number,
    default: 0
  }
});

module.exports = likeSchema;
