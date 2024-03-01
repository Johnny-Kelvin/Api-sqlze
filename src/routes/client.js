const clientController = require('../controllers/clientController')


async function listar_clientes(app){
    app.get('/client', clientController.listaClients)
}

async function listar_cliente_id(app){
    app.get('/client/:id', clientController.listaClientById)
}

async function atualiza_cliente(app){
    app.patch('/client/:id', clientController.atualizaClient)
}

async function criar_cliente(app){
    app.post('/client', clientController.criarClient)
}

async function delete_cliente(app){
    app.delete('/client/:id', clientController.deleteClient)
}

module.exports = {listar_clientes, criar_cliente, listar_cliente_id, delete_cliente, atualiza_cliente}