// theorieMusicalControllers.js
const TheorieMusical = require("../models/MaoModel");

exports.getAllLesson = async (req, res) => {
  try {
    const lessons = await TheorieMusical.find({});
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addLesson = async (req, res) => {
  try {
    const { Titre, element } = req.body;
    const lesson = await TheorieMusical.create({
      Titre,
      element,
      LastUserModify: req.body.LastUserModify,
      Date: req.body.Date,
    });
    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const { Titre, element, LastUserModify, Date } = req.body;

    const updatedLesson = await TheorieMusical.findByIdAndUpdate(
      id,
      { Titre, element, LastUserModify, Date },
      { new: true }
    );

    if (!updatedLesson) {
      return res.status(404).json({ message: "Leçon non trouvée" });
    }

    res.status(200).json(updatedLesson);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;

    const lesson = await TheorieMusical.findByIdAndDelete(id);
    if (!lesson) {
      return res.status(404).json({ message: "Leçon non trouvée" });
    }
    res.status(200).json({ message: "Leçon supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier envoyé" });
    }
    res.status(201).json({ path: req.file.path });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
