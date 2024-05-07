const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Address Schema
const userSchema = new Schema(
  {
    Titre: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Instrument: {
      type: Array,
      required: true,
    },
    BPM: {
      type: Number,
      required: true,
    },
    Exemple: {
      type: String,
      required: false,
    },
    LastUserModify: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },
  },
  { collection: "Genre" }
);

module.exports = mongoose.model("Genre", userSchema);
