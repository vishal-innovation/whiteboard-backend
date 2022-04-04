const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 3,
    required: true,
  },
  // timestamps: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
