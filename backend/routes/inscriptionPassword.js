// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const {
  getInscriptionPassword,
  modifyInscriptionPassword,
} = require("../controllers/inscriptionPasswordControllers");

// 6615075d703968998559086a
router.get("/", getInscriptionPassword);
// router.put("/InscriptionPassword", modifyInscriptionPassword);

module.exports = router;
