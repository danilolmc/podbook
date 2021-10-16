
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import App from './App';
import PodbookController from './controllers/Podbook';
import UserController from './controllers/User';
import { authenticate, verifyToken } from './middlewares/auth';


dotenv.config({ path: `${__dirname}/../../.env` });

const controllers = [
  new UserController(),
  new PodbookController()
];

createConnection().then(() => {

  const middlewares = [
    authenticate,
    verifyToken
  ];

  const app = new App({
    port: 3333,
    controllers: controllers,
    middlewares: []
  });

  app.listen();

}).catch(error => console.log({erro: error, message: error.message }))
