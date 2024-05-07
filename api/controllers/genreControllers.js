const Genre = require("../models/GenreModel");

// Récupérer tous les genres
exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find({});
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ajouter un genre
exports.addGenre = async (req, res) => {
  try {
    const {
      Titre,
      Description,
      BPM,
      Instrument,
      Exemple,
      LastUserModify,
      Date,
    } = req.body;
    const genre = await Genre.create({
      Titre,
      Description,
      BPM,
      Instrument,
      Exemple,
      LastUserModify,
      Date,
    });
    res.status(201).json(genre);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier un genre
exports.updateGenre = async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'ID du genre à mettre à jour depuis les paramètres de la requête
    const {
      Titre,
      Description,
      BPM,
      Instrument,
      Exemple,
      LastUserModify,
      Date,
    } = req.body; // Récupérer les nouvelles données du genre à partir du corps de la requête

    const updatedGenre = await Genre.findByIdAndUpdate(
      id,
      { Titre, Description, BPM, Instrument, Exemple, LastUserModify, Date },
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

// Supprimer un genre
exports.deleteGenre = async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'ID du genre à supprimer depuis les paramètres de la requête

    const genre = await Genre.findByIdAndDelete(id); // Trouver et supprimer le genre correspondant à l'ID
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }
    res.status(200).json({ message: "Genre deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
