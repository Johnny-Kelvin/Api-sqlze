const { verificaToken } = require("../auth/userService");
const clientController = require("../controllers/clientController");

const RotaAutenticada = {
  preHandler: (req, rep, done) => {
    // Barear seu-token
    const token = req.headers.authorization?.replace(/^Bearer /, "");
    if (!token)
      return rep.code(401).send({ message: "Não autorizado: Token está faltando." });

    const user = verificaToken(token);
    if (!user)
      rep.code(404).send({ message: "Não autorizado: Token invalido" });
    req.user = user;
    done();
  },
};

async function home(app) {
  app.get("/", clientController.home);
}

async function listar_clientes(app) {
  app.get("/client", clientController.listaClients);
}

async function listar_cliente_id(app) {
  app.get("/client/:id", clientController.listaClientById);
}

async function atualiza_cliente(app) {
  app.patch("/client/:id", RotaAutenticada, clientController.atualizaClient);
}

async function criar_cliente(app) {
  app.post("/client", RotaAutenticada, clientController.criarClient);
}

async function delete_cliente(app) {
  app.delete("/client/:id", RotaAutenticada, clientController.deleteClient);
}

module.exports = {
  home,
  listar_clientes,
  criar_cliente,
  listar_cliente_id,
  delete_cliente,
  atualiza_cliente,
};
