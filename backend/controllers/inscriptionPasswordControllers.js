const InscriptionPassword = require("../models/InscriptionPasswordModel");

// Récupérer tous les genres
exports.getInscriptionPassword = async (req, res) => {
  try {
    const liste = await InscriptionPassword.findOne({});
    res.status(200).json(liste);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier un genre
exports.updateInscriptionPassword = async (req, res) => {
  try {
    const { index } = req.params; // Récupérer l'ID du genre à mettre à jour depuis les paramètres de la requête

    const updatedGenre = await Genre.findOneAndUpdate(
      index,
      { new: true } // Pour renvoyer le document mis à jour
    );

    if (!updatedGenre) {
      return res.status(404).json({ message: "index not found" });
    }

    res.status(200).json(updatedGenre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
