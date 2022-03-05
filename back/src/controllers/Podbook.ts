import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { Controller } from "../interfaces/Controller";
import { verifyToken } from '../middlewares/auth';
import { getPodbooksFiles } from '../middlewares/podbookResponse';
import { afterUpload, fileUpload } from '../middlewares/upload';
import { PageOptions, PageOptionsParams } from '../model/Pagination';
import { PodbookModel } from '../model/PodbookModel';
import PodbookRepository from '../repository/PodbookRespository';
import { setupLimitAndPageErrorsCase } from '../utils/ExploreErrorsCase';

class PodbookController implements Controller {

    public router = Router();

    constructor() {
        this.initRoutes();
    }

    async initRoutes() {
        this.router.get('/recents', this.recentPodbooks);
        this.router.get('/podbooks', this.explorePodbooks);
        this.router.post('/podbooks', verifyToken, fileUpload, afterUpload, this.save);
    }


    async recentPodbooks(req: Request, res: Response) {
        const podbookRepository = new PodbookRepository();

        try {

            const limitOfRecords = Number(req.query.limit) || 10;

            const recentPodbooks = getPodbooksFiles(await podbookRepository.getRecents(limitOfRecords));

            if (!recentPodbooks) {
                res.status(200).json({ message: 'não foi possível encontrar os podbooks mais recentes' })
                return;
            }

            if (recentPodbooks.length === 0) {
                res.status(404).json({ message: 'ainda não existe podbooks cadastrados' })
                return;
            }

            res.status(200).json(recentPodbooks);

        } catch (error) {

            res.status(400).json({ message: error });

        }
    }

    async explorePodbooks(req: Request, res: Response) {
        const podbookRepository = new PodbookRepository();

        try {

            const { limit, page } = <unknown>req.query as PageOptionsParams;


            const pageOptions = new PageOptions(+page || 1, +limit || 15);

            const setupLimitAndPageErrors = setupLimitAndPageErrorsCase({ limit, page });

            const messageIndex = Object.values(setupLimitAndPageErrors.cases).findIndex(useCase => useCase == true)

            if (messageIndex > -1) {
                res.status(404).json(setupLimitAndPageErrors.messages[messageIndex]);
                return;
            }

            const podbooks = await podbookRepository.explorePodbooks(pageOptions);

            const podbooksDataWithFiles = getPodbooksFiles(podbooks.data);
            const paginationMetadata = podbooks.paginationMetadata;

            if (pageOptions.currentPage > paginationMetadata.pagesAmount) {

                res.status(404).json(
                    {
                        message: `A página ${paginationMetadata.page} não existe`,
                        podbooks: podbooks
                    });
                return;
            }

            const mergedPodbookData = podbooksDataWithFiles && { data: [...podbooksDataWithFiles], paginationMetadata: { ...paginationMetadata } };

            res.status(200).json(mergedPodbookData);

        } catch (error) {
            res.status(400).json({ message: error });
        }
    }

    async save(req: Request, res: Response) {

        const podbookRepository = new PodbookRepository();

        try {

            const decodedJwt = <jwt.JwtPayload>req.headers.decoded_jwt || '';

            const podbook: PodbookModel = { ...req.body, user_owner: decodedJwt.user_id };

            const podbookSaved = await podbookRepository.createPodbook(podbook);

            if (!podbookSaved) {

                res.status(400).json({ message: 'erro ao tentar salvar o podbook' });
                return;
            }

            res.status(201).json({ message: 'podbook salvo com sucesso' })

        } catch (error) {

            res.status(400).json({ message: error });
        }

    }
}

export default PodbookController;