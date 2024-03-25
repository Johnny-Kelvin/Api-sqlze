const app = require('./app');

const port = 3000

const start = async () => {
  
  try{
  await app.listen({ port: port });
    app.log.info(`Server is running on http://localhost:${port}`);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
}


start()