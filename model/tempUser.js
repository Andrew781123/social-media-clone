const mongoose = require("mongoose");

const tempUserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  }
});

const TempUser = mongoose.model("temp_user", tempUserSchema);

module.exports = {
  TempUser
};
