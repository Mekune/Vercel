const ListeInstruments = require("../models/ListeInstrumentsModel");

// Récupérer tous les instruments triés par ordre alphabétique
exports.getAllInstruments = async (req, res) => {
  try {
    const result = await ListeInstruments.findOne({
      _id: "6615088d7039689985590873",
    });
    let instruments = result.instruments;
    instruments.sort((a, b) => a.localeCompare(b)); // Tri par ordre alphabétique
    res.status(200).json(instruments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier la liste des instruments
exports.updateInstruments = async (req, res) => {
  try {
    const { id } = req.params;
    const { instrument } = req.body;

    // Récupérer la liste d'instruments existante
    const result = await ListeInstruments.findOne({
      _id: "6615088d7039689985590873",
    });
    let instruments = result.instruments;

    // Vérifier si l'instrument existe déjà dans la liste
    if (instruments.includes(instrument)) {
      return res.status(400).json({ message: "Instrument already exists" });
    }

    // Ajouter le nouvel instrument à la liste existante
    instruments.push(instrument);
    instruments.sort((a, b) => a.localeCompare(b)); // Tri par ordre alphabétique

    // Mettre à jour la liste des instruments dans la base de données
    const updatedInstrument = await ListeInstruments.findByIdAndUpdate(
      id,
      { instruments },
      { new: true }
    );

    if (!updatedInstrument) {
      return res.status(404).json({ message: "Instrument list not found" });
    }

    res.status(200).json(updatedInstrument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteInstrument = async (req, res) => {
  try {
    const { instrumentIndex } = req.params;
    const instrumentList = await ListeInstruments.findOne(); // Récupérer la liste des instruments

    if (
      !instrumentList ||
      !instrumentList.instruments ||
      instrumentIndex < 0 ||
      instrumentIndex >= instrumentList.instruments.length
    ) {
      return res.status(404).json({ message: "Instrument not found" });
    }

    const deletedInstrument = instrumentList.instruments.splice(
      instrumentIndex,
      1
    )[0]; // Supprimer l'instrument de la liste

    await ListeInstruments.findOneAndUpdate(
      {},
      { instruments: instrumentList.instruments }
    ); // Mettre à jour la liste dans la base de données

    res
      .status(200)
      .json({ message: "Instrument deleted successfully", deletedInstrument });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
