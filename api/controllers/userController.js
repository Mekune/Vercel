const mongoose = require("mongoose"); // Importez mongoose
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsername = async () => {
  try {
    const usernames = await User.find({}, { username: 1, _id: 0 });
    return usernames.map((user) => user.username);
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.createUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    let hashedPassword;
    const salt = process.env.BCRYPT_SALT;

    if (salt) {
      hashedPassword = bcrypt.hashSync(password, salt);
    } else {
      throw new Error("BCRYPT_SALT not defined in environment");
    }

    const user = await User.create({ username, password: hashedPassword });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getIdByUsername = async (req, res, next) => {
  const { username } = req.params; // Récupérer le nom d'utilisateur depuis les paramètres de la requête

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" }); // Utilisateur non trouvé, renvoie une réponse 404
    }
    return res.status(200).json({ userId: user._id }); // Utilisateur trouvé, renvoie l'ID de l'utilisateur
  } catch (error) {
    return next(error); // Passer l'erreur au middleware de gestion des erreurs
  }
};

exports.connexion = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Nom d'utilisateur incorrect" });
    }

    const salt = process.env.BCRYPT_SALT;

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
exports.updateUserById = async (req, res) => {
  const { id } = req.params; // Récupérer l'ID de l'utilisateur depuis les paramètres de la requête
  const { acutalUsername, username, password } = req.body;

  try {
    // Vérifiez si l'ID fourni est un ID MongoDB valide
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID utilisateur invalide" });
    }

    if (password.length < 4) {
      return res.status(400).json({
        message: "Le mot de passe doit contenir au moins 4 caractères",
      });
    }

    let hashedPassword;
    const salt = process.env.BCRYPT_SALT;

    if (!salt) {
      throw new Error("BCRYPT_SALT not defined in environment");
    }

    hashedPassword = bcrypt.hashSync(password, salt);

    // Obtenir la liste des usernames existants
    let existingUsernames = await exports.getAllUsername();

    // Récupérer l'username actuel

    // Exclure l'username actuel de la liste existingUsernames
    existingUsernames = existingUsernames.filter(
      (username) => username !== acutalUsername
    );

    // Vérifier si l'username existe déjà dans la liste
    if (username && existingUsernames.includes(username)) {
      return res.status(400).json({ message: "Cet username existe déjà" });
    }
    // Préparer les données à mettre à jour
    const updatedUserData = {};
    if (username) {
      updatedUserData.username = username;
    }
    updatedUserData.password = hashedPassword;

    // Mettre à jour l'utilisateur par son ID
    const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
