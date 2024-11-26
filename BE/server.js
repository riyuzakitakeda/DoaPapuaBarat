const express = require("express");
const basicAuth = require("basic-auth");
const KabupatenRoutes = require("./routes/kabupaten.routes");
const DistrikRoutes = require("./routes/distrik.routes");
const DesaRoutes = require("./routes/desa.routes");
const KelembagaanRoutes = require("./routes/kelembagaan.routes");
const UserRoute = require("./routes/user.routes");
const cors = require("cors");
// const jwt = require("jsonwebtoken");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

// Middleware to parse Basic Authentication credentials
const authenticate = (req, res, next) => {
  const user = basicAuth(req);
  const username = 'developer'; // Replace with your desired username
  const password = 'Rezky@2023'; // Replace with your desired password

  if (!user || user.name !== username || user.pass !== password) {
    res.set("WWW-Authenticate", "Basic realm=Authorization Required");
    return res.status(401).send("Unauthorized");
  }

  next();
};

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});
app.use("/uploads", express.static("uploads"));
app.use("/api/kelembagaan", authenticate, KelembagaanRoutes);
app.use("/api/kabupaten", authenticate, KabupatenRoutes);
app.use("/api/distrik", authenticate, DistrikRoutes);
app.use("/api/desa", authenticate, DesaRoutes);
app.use("/api/user", authenticate, UserRoute);


// set port, listen for requests
const PORT = process.env.PORT || 8054;
app.listen(PORT, () => {
  console.log(`[*] Server is running on port ${PORT}.`);
});
