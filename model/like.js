const mongoose = require("mongoose");
const userBasicSchema = require("./userBasic");

const likeSchema = new mongoose.Schema({
  user: userBasicSchema,

  likes: {
    type: Number,
    default: 0
  }
});

module.exports = likeSchema;
