import { Request, Response, Router } from 'express';
import { Controller } from "../interfaces/Controller";
import { getPodbooksFiles } from '../middlewares/podbookResponse';
import { PageOptions, PageOptionsParamsWithUserId } from '../model/Pagination';
import UserPodbookRepository from '../repository/UserPodbookRespository';
import UserRepository from '../repository/UserRespository';
import { setupLimitAndPageErrorsCase } from '../utils/ExploreErrorsCase';

class UserPodbookController implements Controller {

    public router = Router();

    constructor() {
        this.initRoutes();
    }

    async initRoutes() {
        this.router.get('/my-podbooks/:user_id', this.myPodbooks);
    }

    async myPodbooks(req: Request, res: Response) {

        const userPodbookRepository = new UserPodbookRepository();
        const userRepository = new UserRepository();

        try {

            const { limit, page, user_id } = <unknown>{ ...req.query, user_id: req.params.user_id } as PageOptionsParamsWithUserId;

            const userExists = !!(await userRepository.findUserById(user_id));

            if (!userExists) {
                res.status(400).json({ message: 'o usuário com o código informado não existe' })
                return;
            }

            const pageOptions = new PageOptions(+page || 1, +limit || 15);

            const setupLimitAndPageErrors = setupLimitAndPageErrorsCase({ limit, page });

            const messageIndex = Object.values(setupLimitAndPageErrors.cases).findIndex(useCase => useCase == true)

            if (messageIndex > -1) {
                res.status(404).json(setupLimitAndPageErrors.messages[messageIndex]);
                return;
            }

            const podbooks = await userPodbookRepository.getUserPodbooks(user_id, pageOptions);

            const podbooksDataWithFiles = getPodbooksFiles(podbooks.data);
            const paginationMetadata = podbooks.paginationMetadata;

            if(podbooks.data.length === 0){
                res.status(200).json(
                    {
                        message: `Esse usuário ainda não possui nenhum podbook salvo`,
                    });
                return;
                
            }
            

            if (pageOptions.currentPage > paginationMetadata.pagesAmount) {

                res.status(404).json(
                    {
                        message: `A página ${paginationMetadata.page} não existe`,
                        podbooks: podbooks
                    });
                return;
            }

            const mergedPodbookData = podbooksDataWithFiles
                && {
                data: [...podbooksDataWithFiles],
                paginationMetadata: { ...paginationMetadata }
            };

            res.status(200).json(mergedPodbookData);

        } catch (error) {
            res.status(400).json({ message: error });
        }
    }
}

export default UserPodbookController;