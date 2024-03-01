
const db = require("./database/database");

const { configure_all } = require("./configuration");


const ini = (app) => app.register(configure_all)



module.exports = ini
