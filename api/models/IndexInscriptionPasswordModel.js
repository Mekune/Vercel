const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Address Schema
const userSchema = new Schema(
  {
    Index: {
      type: Number,
      required: true,
    },
  },
  { collection: "IndexInscriptionPassword" }
);

module.exports = mongoose.model("IndexInscriptionPassword", userSchema);
