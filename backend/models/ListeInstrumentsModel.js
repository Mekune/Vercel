const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Address Schema
const listeInstrumentsSchema = new Schema(
  {
    instruments: {
      type: [String],
      required: true,
    },
  },
  { collection: "ListeInstruments" }
);

module.exports = mongoose.model("ListeInstruments", listeInstrumentsSchema);
