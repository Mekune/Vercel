// routes/userRoutes.js

const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getAllUsername,
  getIdByUsername,
  createUser,
  connexion,
  updateUserById,
} = require("../controllers/userController");

// Route pour récupérer tous les utilisateurs
router.get("/", getAllUsers);
router.get("/username", getAllUsername);
router.get("/id/:username", getIdByUsername);
router.post("/add", createUser);
router.post("/connexion", connexion);
router.put("/:id", updateUserById); // Utilisez la méthode PUT pour mettre à jour l'utilisateur par ID

module.exports = router;
