const express = require("express");
const router = express.Router();
const multer = require("multer");
const KelembagaanContoller = require("../controllers/kelembagaan.controller");
const path = require("path");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/"); // Files will be stored in the 'uploads/' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});
const upload = multer({ storage });

// Retrieve all Kabupatens
router.get("/", KelembagaanContoller.findAll);
router.get("/:id", KelembagaanContoller.findOne);
router.post("/", KelembagaanContoller.create);
router.post("/upload/:id", upload.single("image"), KelembagaanContoller.uploadimage);
router.put("/:id", KelembagaanContoller.update);
router.delete("/:id", KelembagaanContoller.delete);

module.exports = router;
