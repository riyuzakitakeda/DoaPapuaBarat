const db = require("../models");
const Desa = db.desa;

// Create a new Desa
exports.create = (req, res) => {
  const {
    nama_kabupaten,
    nama_distrik,
    nama_desa
  } = req.body;

  Desa.create({
    nama_kabupaten,
    nama_distrik,
    nama_desa
  })
    .then((Desa) => {
      res.status(201).json({ data: Desa, message: "data berhasil ditambahkan", code: 201 });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve all Desaes
exports.findAll = (req, res) => {
  Desa.findAll()
    .then((Desaes) => {
      res.status(200).json(Desaes);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve a single Desa by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Desa.findByPk(id)
    .then((Desa) => {
      if (!Desa) {
        res.status(404).json({ message: "Desa not found" });
        return;
      }
      res.status(200).json(Desa);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Update a Desa by ID
exports.update = (req, res) => {
  const id = req.params.id;
  const {
    nama_kabupaten,
    nama_distrik,
    nama_desa
  } = req.body;

  Desa.findByPk(id)
    .then((Desa) => {
      if (!Desa) {
        res.status(404).json({ message: "Desa not found" });
        return;
      }
      
      Desa.nama_kabupaten = nama_kabupaten;
      Desa.nama_distrik = nama_distrik;
      Desa.nama_desa = nama_desa;

      return Desa.save();
    })
    .then((updatedDesa) => {
      res.status(200).json({data: updatedDesa, message: "Update Data Sukses", code: 200});
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Delete a Desa by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Desa.findByPk(id)
    .then((Desa) => {
      if (!Desa) {
        res.status(404).json({ message: "Desa not found" });
        return;
      }

      return Desa.destroy();
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
