const express = require("express");
const router = express.Router();
const DesaController = require("../controllers/desa.controller");

// Retrieve all Kabupatens
router.get("/", DesaController.findAll);
router.get("/:id", DesaController.findOne);
router.post("/", DesaController.create);
router.put("/:id", DesaController.update);
router.delete("/:id", DesaController.delete);


module.exports = router;
