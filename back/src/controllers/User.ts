import { Request, Response, Router } from 'express';
import { Controller } from "../interfaces/Controller";
import { authenticate, genToken, verifyToken } from '../middlewares/auth';
import { LoginModel } from '../model/UserModel';
import UserRepository from '../repository/UserRespository';

class UserController implements Controller {

    public router = Router();

    constructor() {
        this.initRoutes();
    }

    async initRoutes() {
        this.router.post('/sign-up', this.createUser)
        this.router.post('/sign-in', this.login)
        this.router.post('/me', await verifyToken, this.me)
    }

    async createUser(req: Request, res: Response) {

        const userRepository = new UserRepository();

        try {
            const { id, name, email } = await userRepository.createUser(req.body);

            if (id) {

                const token = genToken({ user_id: id, email: email }, '2h');

                const resp = { user: { id, name, email }, auth: true, token }

                res.status(201).json(resp)
                return;
            }

            res.status(400).send({
                message: "erro ao tentar cadastrar usuario, tente novamente"
            })

        } catch (error) {

            res.status(500).send({
                message: "erro ao tentar cadastrar usuario, tente novamente",
            })
        }

    }

    async login(req: Request, res: Response) {

        try {
            const userCredentials: LoginModel = req.body;

            const authentication = await authenticate(userCredentials);

            if (!authentication?.auth) {
                res.status(Number(authentication.statusCode)).send({ message: authentication.message })
                return;
            }

            res.status(200).send(authentication);


        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'erro ao tentar realizar login, tente novamente' })
        }
    }

    async me(req: Request, res: Response) {

        const userRepository = new UserRepository();

        const user = await userRepository.findUserById(req.body.id);

        res.send(user)
    }

}

export default UserController;