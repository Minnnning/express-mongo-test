// 스키마 설정
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userID: String,
    password: String,
    info: String,
  },
  {
    versionKey: false, // "__v" 항목이 생기지 않도록 설정
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
