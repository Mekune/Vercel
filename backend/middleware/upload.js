const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/"); // Dossier de destination des fichiers téléchargés
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Renommer le fichier avec un nom unique
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
