const { registrar, login } = require("../auth/userService");

async function validRegister(req, rep) {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return {
      code: 400,
      body: { message: "nome, email e senha obrtigatórios" },
    };
  }
  try {
    const user = await registrar(nome, email, senha);
    return  rep.code( 201).send(user)
  } catch (error) {
    return rep.code(400).send({ message: error.message });
  }
}

async function validLogin(req, rep) {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return 
      rep.code(400).
      rep.send({ message: "email ou senha é obrigatório" })
    
  }
   try {
    const body = await login(email, senha);
    return rep.code(200).send(body)
  } catch (error) {
    return rep.code(400).send({ message: error.message});
  }
}
module.exports = { validRegister, validLogin};
