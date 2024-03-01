const Sequelize = require("sequelize");
const db = require("../database");

const Client = db.define("client", {
  id_cli: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome_cli: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  endereco_cli: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  cidade_cli: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  cep_cli: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  uf_cli: {
    type: Sequelize.STRING(2),
    allowNull: false,
  },
});

module.exports = Client;
