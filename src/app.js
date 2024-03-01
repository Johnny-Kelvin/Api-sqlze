const fastify = require("fastify");
const db = require("./database/database");

const { configure_all } = require("./configuration");
const app = fastify({ logger: true });

app.register(configure_all)



module.exports = app;
