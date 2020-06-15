const mongoose = require("mongoose");

const userBasicSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  }
});

module.exports = userBasicSchema;
