import { Request, Response, Router } from 'express';
import { Controller } from "../interfaces/Controller";
import { verifyToken } from '../middlewares/auth';
import { getPodbooksFiles } from '../middlewares/podbookResponse';
import { afterUpload, fileUpload } from '../middlewares/upload';
import { PodbookModel } from '../model/PodbookModel';
import PodbookRepository from '../repository/PodbookRespository';
import fs from 'fs';
import path from 'path';

class PodbookController implements Controller {

    public router = Router();

    constructor() {
        this.initRoutes();
    }

    async initRoutes() {
        this.router.get('/recents', this.recentPodbooks);
        this.router.post('/podbooks', verifyToken, fileUpload, afterUpload, this.save);
    }


    async recentPodbooks(req: Request, res: Response) {
        const podbookRepository = new PodbookRepository();

        try {

            const limitOfRecords = Number(req.query.limit) || 10;

            const recentPodbooks = getPodbooksFiles(await podbookRepository.getRecents(limitOfRecords));

            if (!recentPodbooks) {
                res.status(404).json({ message: 'não foi possível encontrar os podbooks mais recentes' })
                return;
            }

            if (recentPodbooks.length === 0) {
                res.status(404).json({ message: 'ainda não existe podbooks cadastrados' })
                return;
            }

            res.status(200).json(recentPodbooks);

        } catch (error) {

            res.status(400).json({ message: error });

            console.log(error);

        }
    }

    async save(req: any, res: Response) {

        const podbookRepository = new PodbookRepository();

        try {

            const podbook: PodbookModel = req.body;

            const podbookSaved = await podbookRepository.createPodbook(podbook);

            if (!podbookSaved) {

                res.status(400).json({ message: 'error while trying save podbook' });
                return;
            }

            res.status(201).json({ message: 'podbook saved' })

        } catch (error) {

            res.status(400).json({ message: error });
        }

    }
}

export default PodbookController;