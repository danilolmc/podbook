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
        this.router.get('/me', verifyToken, this.me)
    }

    async createUser(req: Request, res: Response) {

        const userRepository = new UserRepository();
        try {
            const { id, name, email } = await userRepository.createUser(req.body);

            if (id) {

                const token = genToken({ user_id: id, email: email }, '2h');

                const resp = { user: { id, name, email }, auth: !!token}

                res.header({
                    'access-control-expose-headers': 'x-auth-token',
                    'x-auth-token': token
                });

                res.status(201).json(resp)
                return;
            }

            res.status(400).json({
                message: "erro ao tentar cadastrar usuario, tente novamente"
            })

        } catch (error) {

            res.status(500).json({
                message: "1 erro ao tentar cadastrar usuario, tente novamente",
            })
        }

    }

    async login(req: Request, res: Response) {


        try {
            const userCredentials: LoginModel = req.body;

            const authentication = await authenticate(userCredentials);

            if (!authentication?.auth) {
                res.status(Number(authentication.statusCode)).json({ message: authentication.message })
                return;
            }

            res.header({
                'access-control-expose-headers': 'x-auth-token',
                'x-auth-token': authentication.token
            });
            res.status(200).json({ authenticated: authentication.auth });

        } catch (error) {
            res.status(500).json({ message: 'erro ao tentar realizar login' })
        }
    }

    async me(req: Request, res: Response) {

        const userRepository = new UserRepository();

        try {

            const user = await userRepository.findUserById(req.body.id);

            if (!user) {

                res.status(404).json({ message: `usuário com código ${req.body.id} não foi encontrado` })
                
                return;
            }

            const { id, name, email } = user;

            res.json({ id, name, email });

        } catch (error) {
            res.status(500).json({ message: 'erro ao buscar dados do perfil' })
        }

    }

}

export default UserController;