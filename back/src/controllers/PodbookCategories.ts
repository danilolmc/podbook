import { Request, Response, Router } from 'express';
import { Controller } from "../interfaces/Controller";
import PodbookCategoryRepository from '../repository/PodbookCategoryRespository';

class PodbookCategoriesController implements Controller {

    public router = Router();

    constructor() {
        this.initRoutes();
    }

    async initRoutes() {
        this.router.get('/categories', this.getPodbookCategories);
    }


    async getPodbookCategories(req: Request, res: Response) {
        const podbookCategoryRepository = new PodbookCategoryRepository();

        try {

            const limitOfRecords = Number(req.query.limit) || 15;

            const categories = await podbookCategoryRepository.getPodbookCategories(limitOfRecords);

            console.log(categories)

            if (!categories?.length) {
                res.status(200).json({ message: 'não foi encontrada nenhuma categoria' })
                return;
            }

            res.status(200).json(categories);

        } catch (error) {

            res.status(400).json({ message: error });
        }
    }

}

export default PodbookCategoriesController;