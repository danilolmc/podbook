
import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import App from './App';
import PodbookController from './controllers/Podbook';
import PodbookCategoriesController from './controllers/PodbookCategories';
import UserController from './controllers/User';
import UserPodbookController from './controllers/UserPodbook';


dotenv.config({ path: `${__dirname}/../../.env` });

const controllers = [
  new UserController(),
  new PodbookController(),
  new PodbookCategoriesController(),
  new UserPodbookController()
];

createConnection().then(() => {

  const app = new App({
    host: String(process.env.HOST),
    port: Number(process.env.SERVER_PORT),
    controllers: controllers,
    middlewares: []
  });

  app.listen();

}).catch(error => console.log({erro: error, message: error.message }))
