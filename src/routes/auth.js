const { validRegister, validLogin } = require("../controllers/authController");

async function registrar(app) {
  app.post("/auth/register", validRegister);
}

async function logar(app) {
  app.post("/auth/login", validLogin);
}

module.exports = { registrar, logar };
