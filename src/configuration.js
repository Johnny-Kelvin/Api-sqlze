const db = require("./database/database");
const client = require("./routes/client");

async function configure_all(app){
    await db.sync()
    configure_routes(app)
}

async function configure_routes (app){
    app.register(client.home)
    app.register(client.listar_clientes)
    app.register(client.criar_cliente)
    app.register(client.listar_cliente_id)
    app.register(client.delete_cliente)
    app.register(client.atualiza_cliente)
}
function configure_db(){
     db.sync()
}


module.exports = {configure_all}