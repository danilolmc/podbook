
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import App from './App';
import PodbookController from './controllers/Podbook';
import UserController from './controllers/User';


dotenv.config({ path: `${__dirname}/../../.env` });

const controllers = [
  new UserController(),
  new PodbookController()
];

createConnection().then(() => {

  const app = new App({
    port: Number(process.env.SERVER_PORT),
    controllers: controllers,
    middlewares: []
  });

  app.listen();

}).catch(error => console.log({erro: error, message: error.message }))
