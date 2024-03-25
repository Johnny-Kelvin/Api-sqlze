const { FindByEmail, SaveUser } = require("./User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registrar(nome_user, email_user, senha_user) {
  const UserExists = await FindByEmail(email_user);
  if (UserExists) throw new Error("sai fora");
  const newUser = { nome_user, email_user, senha_user };
  newUser.senha_user = bcrypt.hashSync(newUser.senha_user, 10);
  await SaveUser(newUser);
  return newUser;
}

async function login(email, senha) {
  const user = await FindByEmail(email);
  if (!user) throw new Error("Usuario nao encontrado");

  const mesmaSenha = bcrypt.compareSync(senha, user.senha_user);
  if (!mesmaSenha) throw new Error("Senha Errada");

  const token =  jwt.sign(
    { id: user.id_user, email: user.email_user },
    "I-Love-Casadas😍",
    { expiresIn: "180d" }
  );
  return { token, user };
}

async function verificaToken(token) {
    if(token && token != null && token != '' && token != undefined){
      const tokenDecifrado = jwt.verify(token, "I-Love-Casadas😍");
      const user = await FindByEmail(tokenDecifrado.email);
      user.senha_user = undefined
      return user
    }
     
  
}

module.exports = { registrar, login, verificaToken };
