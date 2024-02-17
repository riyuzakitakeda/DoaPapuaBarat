const db = require("../models");
const Kelembagaan = db.kelembagaan;

// Create a new Kelembagaan
exports.create = (req, res) => {
  const data = req.body;

  Kelembagaan.create({
    data
  })
    .then((Kelembagaan) => {
      res.status(201).json(Kelembagaan);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve all Kelembagaanes
exports.findAll = (req, res) => {
  Kelembagaan.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve a single Kelembagaan by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Kelembagaan.findByPk(id)
    .then((Kelembagaan) => {
      if (!Kelembagaan) {
        res.status(404).json({ message: "Kelembagaan not found" });
        return;
      }
      res.status(200).json(Kelembagaan);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Update a Kelembagaan by ID
exports.update = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  Kelembagaan.findByPk(id)
    .then((Kelembagaan) => {
      if (!Kelembagaan) {
        res.status(404).json({ message: "Kelembagaan not found" });
        return;
      }

      Kelembagaan = data;

      return Kelembagaan.save();
    })
    .then((updatedKelembagaan) => {
      res.status(200).json(updatedKelembagaan);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Delete a Kelembagaan by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Kelembagaan.findByPk(id)
    .then((Kelembagaan) => {
      if (!Kelembagaan) {
        res.status(404).json({ message: "Kelembagaan not found" });
        return;
      }

      return Kelembagaan.destroy();
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
