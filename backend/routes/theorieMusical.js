// theorieMusicalRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllLesson,
  addLesson,
  updateLesson,
  deleteLesson,
} = require("../controllers/theorieMusicalControllers");
const upload = require("../middleware/upload");

router.get("/", getAllLesson);
router.post("/add", upload.array("file", 10), addLesson);
router.put("/update/:id", upload.array("file", 10), updateLesson);
router.delete("/delete/:id", deleteLesson);

module.exports = router;
