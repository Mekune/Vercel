const mongoose = require("mongoose");

const theorieMusicalSchema = new mongoose.Schema({
  Titre: {
    type: String,
    required: true,
  },
  element: [
    {
      valeur: {
        type: String,
        required: true,
      },
      position: {
        type: Number,
        required: true,
      },
      isOne: {
        type: Number,
        required: true,
      },
    },
  ],
  LastUserModify: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TheorieMusical", theorieMusicalSchema);
