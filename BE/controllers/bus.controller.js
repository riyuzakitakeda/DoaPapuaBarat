const db = require("../models");
const Bus = db.bus;

// Create a new Bus
exports.create = (req, res) => {
  const { nama, plat, kapasitas } = req.body;

  Bus.create({
    nama,
    plat,
    kapasitas,
  })
    .then((bus) => {
      res.status(201).json(bus);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve all Buses
exports.findAll = (req, res) => {
  Bus.findAll()
    .then((buses) => {
      res.status(200).json(buses);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve a single Bus by ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Bus.findByPk(id)
    .then((bus) => {
      if (!bus) {
        res.status(404).json({ message: "Bus not found" });
        return;
      }
      res.status(200).json(bus);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Update a Bus by ID
exports.update = (req, res) => {
  const id = req.params.id;
  const { nama, plat, kapasitas } = req.body;

  Bus.findByPk(id)
    .then((bus) => {
      if (!bus) {
        res.status(404).json({ message: "Bus not found" });
        return;
      }

      bus.nama = nama;
      bus.plat = plat;
      bus.kapasitas = kapasitas;

      return bus.save();
    })
    .then((updatedBus) => {
      res.status(200).json(updatedBus);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Delete a Bus by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  Bus.findByPk(id)
    .then((bus) => {
      if (!bus) {
        res.status(404).json({ message: "Bus not found" });
        return;
      }

      return bus.destroy();
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
