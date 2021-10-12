
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import App from './App';
import UserController from './controllers/User';
import { authenticate, verifyToken } from './middlewares/auth';


dotenv.config({ path: `${__dirname}/../../.env` });

createConnection().then(() => {

  const controllers = [
    new UserController()
  ];

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

})
