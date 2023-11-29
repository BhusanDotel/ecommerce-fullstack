const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    required: true,
  },
  userToken: {
    type: String,
    required: false,
  },
  adminToken: {
    type: String,
    required: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
  },
});

const UsersData = mongoose.model("Users", userSchema);

module.exports = UsersData;
