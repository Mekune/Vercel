const express = require("express");
const router = express.Router();
const {
  getIndexInscriptionPassword,
  updateIndexInscriptionPassword,
} = require("../controllers/indexInscriptionPasswordControllers");

router.get("/", getIndexInscriptionPassword);
router.put("/:Index", updateIndexInscriptionPassword); // Assurez-vous que la fonction de contrôleur est correcte ici

module.exports = router;
