const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Définition du schéma pour la collection InscriptionPassword
const InscriptionPasswordSchema = new Schema(
  {
    // Champ correspondant à la liste
    liste: {
      type: [String], // Utilisation du type Array avec sous-type String
      required: true,
    },
  },
  { collection: "InscriptionPassword" }
);

// Création du modèle InscriptionPassword à partir du schéma défini
const InscriptionPassword = mongoose.model(
  "InscriptionPassword",
  InscriptionPasswordSchema
);

module.exports = InscriptionPassword;
