const Client = require("../database/models/client");
const User = require("../database/models/user");

//const db = require("../database/database");

async function home(req, reply) {
  const html = `<!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <title>API FASTIFY & SEQUELIZE</title>
        <style>
            body{
        background: rgb(137, 27, 201);
        font: normal 15pt Arial;
            
        }
    
        header{
            color: white;
            margin-top: 300px;
            text-align: center;
        }
    
        section{
            text-align: center;
            background: white;
            border-radius: 10px;
            padding: 15px;
            width: 500px;
            margin:auto;
            box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.356)	;
        }
    
        footer{
            color: white;
            text-align: center;
        }
        </style>
    </head>
    <body>
        <header>
            <h1>API BASCICA</h1>
        </header>
        <section>
            <div>
                Vá para <strong>"/client"</strong> para fazer as requisiçoes 😊🤭
            </div>
        </section>
        <footer>
            <p>pode testar ai avontade </p>
        </footer>
        <script></script>
    </body>
    </html>`;

  return reply
    .code(200)
    .header("Content-Type", "text/html")
    .type("text/html")
    .send(html);
}

const existId = async (id) => {
  const valid = await Client.findOne({ where: { id: id } });

  return valid;
};

async function listaClients(req, reply) {
  const post = await Client.findAll();
  return reply.send(post);
}

async function listaClientById(req, reply) {
  const id = req.params.id;
  //const exist = await existId(id);
  return (await existId(id))
    ? reply
        .code(200)
        .header("Content-Type", "application/json")
        .type("text/json")
        .send(await existId(id))
    : reply.send({ message: "Não achei" });
}

async function atualizaClient(req, reply) {
  const id = req.params.id;
  const dados = req.body;

  return (await existId(id))
    ? (await Client.update(dados, { where: { id_cli: id } }),
      reply.code(202).send({
        message: `Atualizado com sucesso :`,
        client: await existId(id),
      }))
    : reply.code(404).send({
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
  const { nome_cli, senha_cli, endereco_cli, cidade_cli, cep_cli, uf_cli } =
    req.body;
  const user = await req.user; //Full pq esta vindo com tds infos

  if (
    !nome_cli ||
    !senha_cli ||
    !endereco_cli ||
    !cidade_cli ||
    !cep_cli ||
    !uf_cli
  ) {
    return { code: 400, body: { message: "Preenche tudo ai krl!" } };
  }



  const post = await Client.create({
    user,
    nome_cli,
    senha_cli,
    endereco_cli,
    cidade_cli,
    cep_cli,
    uf_cli,
  });

  return reply.code(201).send(post);
}

async function deleteClient(req, reply) {
  const id = req.params.id;

  return (await existId(id))
    ? await Client.destroy(
        { where: { id: id } },
        reply.code(202).send({
          message: `Cliente deletado com sucesso :`,
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
  home,
  listaClients,
  criarClient,
  listaClientById,
  deleteClient,
  atualizaClient,
};
