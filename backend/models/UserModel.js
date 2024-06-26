const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Address Schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "User" }
);

module.exports = mongoose.model("User", userSchema);
