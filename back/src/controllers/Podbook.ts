import { Request, Response, Router } from 'express';
import { Controller } from "../interfaces/Controller";

class PodbookController implements Controller {

    public router = Router();

    constructor() {
        this.initRoutes();
    }

    async initRoutes() {
        this.router.get('/recents', this.recentPodbooks);
        this.router.post('/podbooks', this.save);
    }


    async recentPodbooks(req: Request, res: Response) {
        console.log(req.body.teste)
        res.send({ teste: 'teste' })
    }

    async save(req: Request, res: Response) {

        console.log(req.body.teste);

        res.send({ teste: 'recebido' })
    }
}

export default PodbookController;