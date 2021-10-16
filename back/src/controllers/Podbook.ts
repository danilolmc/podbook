import { Request, Response, Router } from 'express';
import { Controller } from "../interfaces/Controller";

class PodbookController implements Controller {

    public router = Router();

    constructor() {
        this.initRoutes();
    }

    async initRoutes() {
        this.router.get('/recents', this.recentPodbooks);
    }


    async recentPodbooks(req: Request, res: Response){
        res.send({teste: 'teste'})
    }
}

export default PodbookController;