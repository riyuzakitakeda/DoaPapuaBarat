const db = require("../models");
const Kabupaten = db.kabupaten;

// Create a new Kabupaten
exports.create = (req, res) => {
  const { nama_kabupaten } = req.body;

  Kabupaten.create({
    nama_kabupaten,
  })
    .then((Kabupaten) => {
      res.status(201).json({data: Kabupaten, message: "data berhasil ditambahkan", code: 201});
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve all Kabupatenes
exports.findAll = (req, res) => {
  Kabupaten.findAll()
    .then((Kabupatenes) => {
      res.status(200).json(Kabupatenes);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.findAllByKab = (req, res) => {
  const { nama_kabupaten } = req.body;
  Kabupaten.findAll({where: {nama_kabupaten: nama_kabupaten}})
    .then((Kabupatenes) => {
      res.status(200).json(Kabupatenes);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve a single Kabupaten by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Kabupaten.findByPk(id)
    .then((Kabupaten) => {
      if (!Kabupaten) {
        res.status(404).json({ message: "Kabupaten not found" });
        return;
      }
      res.status(200).json(Kabupaten);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Update a Kabupaten by ID
exports.update = (req, res) => {
  const id = req.params.id;
  const { nama_kabupaten } = req.body;

  Kabupaten.findByPk(id)
    .then((Kabupaten) => {
      if (!Kabupaten) {
        res.status(404).json({ message: "Kabupaten not found" });
        return;
      }

      Kabupaten.nama_kabupaten = nama_kabupaten;

      return Kabupaten.save();
    })
    .then((updatedKabupaten) => {
      res.status(200).json({data: updatedKabupaten, message: "Update Data Sukses", code: 200});
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Delete a Kabupaten by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Kabupaten.findByPk(id)
    .then((Kabupaten) => {
      if (!Kabupaten) {
        res.status(404).json({ message: "Kabupaten not found" });
        return;
      }

      return Kabupaten.destroy();
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
