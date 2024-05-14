// routes/listeInstrumentsRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllInstruments,
  updateInstruments,
  deleteInstrument,
} = require("../controllers/listeInstrumentsControllers");

router.get("/", getAllInstruments);
router.put("/modify/:id", updateInstruments);
router.delete("/delete/:instrumentIndex", deleteInstrument);

module.exports = router;
