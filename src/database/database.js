const { Sequelize } = require("sequelize");

const db = new Sequelize(
  "postgresql://fmshwmps:6SnFjfe-ZCEzAQKvIhtTAfMn_po11fQ3@silly.db.elephantsql.com/fmshwmps",
  {
    dialect: "postgres",
    storage: "../database.db",
  }
);

module.exports = db;
