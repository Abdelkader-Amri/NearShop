const mongoose = require("mongoose");
const db = require("./index.js");

const UserSchema = new mongoose.Schema({
  email: {unique: true, type: String},
  username: {unique: true, type: String},
  // image: String,
  // address: String,
  // phone: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

module.exports = User;