require('./database/models/client')

const  db = require("./database/database");
const init = require('./app');
const app = require('./app');

const port = 10000;


const start = async () => {
  if (require.main === module) {
    // called directly i.e. "node app"
    app.listen({ port: port }, (err) => {
      if (err) console.error(err);
      console.log('server listening on 3000');
    });
  } else {
    // required as a module => executed on aws lambda
    module.exports = app;
  }
}
start();
