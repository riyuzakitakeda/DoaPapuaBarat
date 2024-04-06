const express = require("express");
const router = express.Router();
const KabupatenController = require("../controllers/kabupaten.controller");

// Retrieve all Kabupatens
router.get("/", KabupatenController.findAll);
router.get("/:id", KabupatenController.findOne);
router.get("/filter/:kab", KabupatenController.findAllByKab);
router.post("/", KabupatenController.create);
router.put("/:id", KabupatenController.update);
router.delete("/:id", KabupatenController.delete);


module.exports = router;
