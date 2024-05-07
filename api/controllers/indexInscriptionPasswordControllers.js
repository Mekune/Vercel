// controllers/indexInscriptionPasswordControllers.js

const IndexInscriptionPassword = require("../models/IndexInscriptionPasswordModel");

exports.getIndexInscriptionPassword = async (req, res) => {
  try {
    const index = await IndexInscriptionPassword.findOne({});
    res.status(200).json(index);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateIndexInscriptionPassword = async (req, res) => {
  try {
    const id = "6615081f703968998559086c"; // Récupérer l'ID du genre à mettre à jour depuis les paramètres de la requête
    const { Index } = req.params; // Récupérer les nouvelles données du genre à partir du corps de la requête
    const updatedGenre = await IndexInscriptionPassword.findByIdAndUpdate(
      id,
      { Index },
      { new: true } // Pour renvoyer le document mis à jour
    );

    if (!updatedGenre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    res.status(200).json(updatedGenre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
