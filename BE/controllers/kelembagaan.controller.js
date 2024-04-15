const db = require("../models");
const Kelembagaan = db.kelembagaan;

// Create a new Kelembagaan
exports.create = (req, res) => {
  const data = req.body;
  Kelembagaan.create(data)
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
  // console.log(data);

  Kelembagaan.findByPk(id)
    .then((kelembagaan) => {
      if (!kelembagaan) {
        res.status(404).json({ message: "Kelembagaan not found" });
        return;
      }
      kelembagaan.nama_kabupaten = data.nama_kabupaten;
      kelembagaan.nama_kegiatan =  data.nama_kegiatan;
      kelembagaan.distrik = data.distrik;
      kelembagaan.desa =  data.desa;
      kelembagaan.nama_tempat_ibadah = data.nama_tempat_ibadah;
      kelembagaan.nama_ketua = data.nama_ketua;
      kelembagaan.jumlah_jiwa = data.jumlah_jiwa;
      kelembagaan.jumlah_kk = data.jumlah_kk;
      kelembagaan.jumlah_laki = data.jumlah_laki;
      kelembagaan.jumlah_perempuan = data.jumlah_perempuan;
      kelembagaan.jumlah_pns = data.jumlah_pns;
      kelembagaan.jumlah_petani_nelayan = data.jumlah_petani_nelayan;
      kelembagaan.jumlah_swasta = data.jumlah_swasta;
      kelembagaan.alamat = data.alamat;
      kelembagaan.foto = data.foto;
      return kelembagaan.save();
    })
    .then((updatedKelembagaan) => {
      res.status(200).json(updatedKelembagaan);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.uploadimage = async (req, res) => {
  const id = req.params.id;

  if (!req.file) {
    console.log("error");
    return res.status(500).send("No file uploaded.");
  }
  try {
  } catch (error) {
    console.log(error);
  }

  // You can access the uploaded file's information in req.file
  const filePath = req.file.path;

  Kelembagaan.findByPk(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      user.foto = filePath;

      return user.save();
    })
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
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
