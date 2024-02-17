const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.kelembagaan = require("./datakelembagaan.js")(sequelize, Sequelize);
db.kabupaten = require("./datakabupaten.js")(sequelize, Sequelize);
db.distrik = require("./datadistrik.js")(sequelize, Sequelize);
db.desa = require("./datadesa.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);

// db.user.belongsTo(db.sekolah, { foreignKey: "sekolah_id" });
// db.mintervensi.hasOne(db.interstunting, { foreignKey: "id" });

module.exports = db;
