const Sequelize = require("sequelize");
const db = require("../database");

const User = db.define("user", {
  id_user: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  nome_user: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  email_user: {
    type: Sequelize.STRING(50),
    allowNull: false,
    validate: {
      isEmail: true,
    }
  },
  senha_user: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = User;
 