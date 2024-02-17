const db = require("../models");
const User = db.user;
const jwt = require("jsonwebtoken");

//login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.validatePassword(password) == true) {
      const token = jwt.sign({ name: user.username }, "mysecretkey123", {
        expiresIn: "1h", // Token expiration time (adjust as needed)
      });

      res.status(200).json({ token, user: user });
      console.log("Password is valid. User authenticated.");
    } else return res.status(401).json({ message: "Invalid password" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new user
exports.create = async (req, res) => {
  const {
    username,
    password,
    nama,
    kabupaten,
    type
  } = req.body;

  try {
    let check = await User.findOne({ where: { username: username } });
    if (check != null) {
      res.status(201).json({ message: "Username Telah terdaftar", code: 500 });
    } else {
      User.create({
        username,
        nama,
        kabupaten,
        type
      })
        .then((user) => {
          user.setPassword(password); // Set the password
          user.save().then(() => {
            console.log("User created with hashed password.");
            res.status(201).json({message: 'User telah ditambahkan', code: 201});
          });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
};

// Retrieve all users
exports.findAll = (req, res) => {
  User.findAll()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Retrieve a single user by ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Update a user by ID
exports.update = async (req, res) => {
  const id = req.params.id;
  const {
    username,
    password,
    nama,
    kabupaten,
    type
  } = req.body;
  try {
    let check = await User.findOne({ where: { username: username } });
    if (check != null && check.id != id) {
      res.status(500).json({ message: "Username telah terdaftar, silahkan gunakan username lainnya", code: 500});
    } else {
      User.findByPk(id)
        .then((user) => {
          if (!user) {
            res.status(404).json({ message: "User not found", code: 404 });
            return;
          }

          user.username = username;
          user.nama = nama;
          user.kabupaten = kabupaten;
          if (password != "") {
            user.setPassword(password);
          }
          user.type = type;
          console.log('[+] pass: '+user.password)
          return user.save();
        })
        .then((updatedUser) => {
          res.status(200).json({message: 'User '+updatedUser.username+' telah diubah', code: 200});
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
exports.uploadimage = async (req, res) => {
  const id = req.params.id;
  console.log("error");

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

  User.findByPk(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      user.profile_image = filePath;

      return user.save();
    })
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

// Delete a user by ID
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      return user.destroy();
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
