const db = require("../models");
const Distrik = db.distrik;

// Create a new Distrik
exports.create = (req, res) => {
  const {
    nama_kabupaten,
    nama_distrik
  } = req.body;

  Distrik.create({
    nama_kabupaten,
    nama_distrik
  })
    .then((Distrik) => {
      res.status(201).json({ data: Distrik, message: "data berhasil ditambahkan", code: 201 });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve all Distrikes
exports.findAll = (req, res) => {
  Distrik.findAll()
    .then((Distrikes) => {
      res.status(200).json(Distrikes);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findKab = (req, res) => {
  const nama_distrik = req.params.distrik;
  Distrik.findOne({where: {nama_distrik: nama_distrik}})
    .then((Distrik) => {
      if (!Distrik) {
        res.status(404).json({ message: "Distrik not found" });
        return;
      }
      res.status(200).json(Distrik);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findAllByKab = (req, res) => {
  const nama_kabupaten = req.params.kabupaten;
  Distrik.findAll({where: {nama_kabupaten: nama_kabupaten}})
    .then((Distrik) => {
      if (!Distrik) {
        res.status(404).json({ message: "Distrik not found" });
        return;
      }
      res.status(200).json(Distrik);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve a single Distrik by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Distrik.findByPk(id)
    .then((Distrik) => {
      if (!Distrik) {
        res.status(404).json({ message: "Distrik not found" });
        return;
      }
      res.status(200).json(Distrik);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Update a Distrik by ID
exports.update = (req, res) => {
  const id = req.params.id;
  const {
    nama_kabupaten,
    nama_distrik
  } = req.body;

  Distrik.findByPk(id)
    .then((Distrik) => {
      if (!Distrik) {
        res.status(404).json({ message: "Distrik not found" });
        return;
      }
      
      Distrik.nama_kabupaten = nama_kabupaten;
      Distrik.nama_distrik = nama_distrik;

      return Distrik.save();
    })
    .then((updatedDistrik) => {
      res.status(200).json({data: updatedDistrik, message: "Update Data Sukses", code: 200});
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Delete a Distrik by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Distrik.findByPk(id)
    .then((Distrik) => {
      if (!Distrik) {
        res.status(404).json({ message: "Distrik not found" });
        return;
      }

      return Distrik.destroy();
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
