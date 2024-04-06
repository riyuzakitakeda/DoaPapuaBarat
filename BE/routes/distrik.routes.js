const express = require("express");
const router = express.Router();
const DistrikController = require("../controllers/distrik.controller");

// Retrieve all Kabupatens
router.get("/", DistrikController.findAll);
router.get("/:id", DistrikController.findOne);
router.post("/", DistrikController.create);
router.get("/filter/:distrik", DistrikController.findKab);
router.get("/filterkab/:kabupaten", DistrikController.findAllByKab);
router.put("/:id", DistrikController.update);
router.delete("/:id", DistrikController.delete);


module.exports = router;
