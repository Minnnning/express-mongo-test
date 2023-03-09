// 스키마 설정
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: String,
  password: String,
  info: String,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
