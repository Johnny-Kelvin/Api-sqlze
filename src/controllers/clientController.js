const { where } = require("sequelize");
const Client = require("../database/models/client");

const existId = async (id) => {
  const valid = await Client.findOne({ where: { id_cli: id } });

  return valid;
};
async function listaClients(req, reply) {
  const post = await Client.findAll();
  return reply.send({ post });
}

async function listaClientById(req, reply) {
  const id = req.params.id;
  //const exist = await existId(id);
  return (await existId(id))
    ? reply.code(200).send(await existId(id))
    : reply.send({ message: "Não achei" });
}

async function atualizaClient(req, reply) {
  const id = req.params.id;
  const dados = req.body;

  return (await existId(id))
    ? (await Client.update(dados, { where: { id_cli: id } }),
      reply
        .code(202)
        .send({
          message: `Atualizado com sucesso :`,
          client: await existId(id),
        }))
    : reply
        .code(404)
        .send({
          message: "Não foi possivel atualizar, cliente não encontrado",
        });

  //   if (existId(id)) {
  //     await Client.update(dados, { where: { id_cli: id } });
  //     return reply
  //       .code(202)
  //       .send({ message: `Atualizado com sucesso :`, client: existId });
  //   }
  //   return reply
  //     .code(404)
  //     .send({ message: "Não foi possivel atualizar, cliente não encontrado" });
}

async function criarClient(req, reply) {
  const { nome_cli, endereco_cli, cidade_cli, cep_cli, uf_cli } = req.body;

  if ((!nome_cli || !endereco_cli || !cidade_cli, !cep_cli, !uf_cli)) {
    return { code: 400, body: { message: "Preenche tudo ai krl!"}  };
  }

  const post = await Client.create({
    nome_cli,
    endereco_cli,
    cidade_cli,
    cep_cli,
    uf_cli,
  });

  return reply.code(201).send({ message: "Client created !", post });
}

async function deleteClient(req, reply) {
  const id = req.params.id;

  return (await existId(id))
    ? await Client.destroy(
        { where: { id_cli: id } },
        reply
          .code(202)
          .send({
            message: `Cliente deletado com sucesso :`
          })
      )
    : reply
        .code(404)
        .send({ message: "Não foi possivel deletar, cliente não encontrado" });

  //   const existId = await Client.findOne({ where: { id_cli: id } });
  //   if (existId) {
  //     await Client.destroy({ where: { id_cli: id } });
  //     return reply
  //       .code(202)
  //       .send();
  //   }
  //   return reply
  //     .code(404)
  //     .send({ message: "Não foi possivel deletar, cliente não encontrado" });
}

module.exports = {
  listaClients,
  criarClient,
  listaClientById,
  deleteClient,
  atualizaClient,
};
