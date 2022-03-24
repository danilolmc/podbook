import cors from 'cors';
import express, { Application } from 'express';
import { Controller } from "./interfaces/Controller";


class App {
    public app: Application;
    public port: number;
    public host: string;

    constructor(appInit: { host: string, port: number, controllers: Controller[], middlewares: any[] }) {

        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cors());
        app.use(express.static(`files`))
        
        this.app = app;
        this.port = appInit.port;
        this.host = appInit.host;
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
        this.app.listen(this.port, this.host, () => {
            console.log(`App listening on the ${this.host}:${this.port}`)
        })
    }
}

export default App;