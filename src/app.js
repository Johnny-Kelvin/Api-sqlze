const path = require("path");

const app = require("fastify")({ logger: true,});
app.register(require('@fastify/cors'), {
  origin:'*',
  methods:['*'],
  
})
//app.register(require('fastify-favicon'), { path: './public', name: 'icon.ico', maxAge: 3600 })
const { configure_all } = require("./configuration");
app.register(configure_all)


module.exports = app;