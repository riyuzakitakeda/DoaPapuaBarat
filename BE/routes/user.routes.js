// UserRoute.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const UserController = require("../controllers/user.controller.js");
// const { body } = require("express-validator");
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

// Define validation rules
// const createUserValidation = [
//   body("nama").trim().isLength({ min: 1 }).withMessage("Nama is required"),
//   body("alamat").trim().isLength({ min: 1 }).withMessage("Alamat is required"),
//   body("no_telp").isInt().withMessage("No. Telp must be an integer"),
//   body("email").trim().isEmail().withMessage("Invalid email"),
//   body("password")
//     .isLength({ min: 6 })
//     .withMessage("Password must be at least 6 characters long"),
// ];

// Create a new user
router.post("/login", UserController.login);
router.post("/upload/:id", upload.single("image"), UserController.uploadimage);
router.post("/", UserController.create);
// Retrieve all users
router.get("/", UserController.findAll);
router.get("/adminkabupaten", UserController.findAllAdminKabupaten);
router.get("/admindistrik", UserController.findAllAdminDistrik);
router.get("/admindesa", UserController.findAllAdminDesa);

// Retrieve a single user by ID
router.get("/:id", UserController.findOne);
// Update a user by ID
router.put("/:id", UserController.update);
// Delete a user by ID
router.delete("/:id", UserController.delete);
module.exports = router;
