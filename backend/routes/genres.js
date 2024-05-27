// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllGenres,
  addGenre,
  updateGenre,
  deleteGenre,
  getAvailableInstrumentsForGenre,
} = require("../controllers/genreControllers");

// Route pour récupérer tous les utilisateurs
router.get("/", getAllGenres);
router.get("/instruments/:id", getAvailableInstrumentsForGenre);
router.post("/add", addGenre);
router.put("/update/:id", updateGenre);
router.delete("/delete/:id", deleteGenre);

module.exports = router;
