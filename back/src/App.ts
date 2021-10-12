import express, { Application } from 'express';
import { Controller } from "./interfaces/Controller";
import cors from 'cors';


class App {
    public app: Application;
    public port: number;

    constructor(appInit: { port: number, controllers: Controller[], middlewares: any[] }) {

        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors({ origin: 'http://localhost:4200' }));

        this.app = app;
        this.port = appInit.port;
        this.routes(appInit.controllers);
        this.middlewares(appInit?.middlewares);
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach((controller: Controller) => {
            this.app.use('/podbook/api/', controller.router);
        })
    }

    private middlewares(middleWares?: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares?.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`)
        })
    }
}

export default App;