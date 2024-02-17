const express = require("express");
const router = express.Router();
const KelembagaanContoller = require("../controllers/kelembagaan.controller");

// Retrieve all Kabupatens
router.get("/", KelembagaanContoller.findAll);
router.get("/:id", KelembagaanContoller.findOne);
router.post("/", KelembagaanContoller.create);
router.put("/:id", KelembagaanContoller.update);
router.delete("/:id", KelembagaanContoller.delete);

module.exports = router;
