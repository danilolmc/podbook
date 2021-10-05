import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { LoginModel } from "../model/UserModel";
import UserRepository from "../repository/UserRespository";
import { comparePassword } from "../utils/Hashing";


export const genToken = (tokenProperties: {}, expireTime: number | string) => {

    const configSecret: string = process.env.TOKEN_KEY || '';
    
    return jwt.sign({ ...tokenProperties }, configSecret, { expiresIn: expireTime })
}

export const verifyToken = (req: any, res: Response, next: any) => {
    
    const configSecret: string = process.env.TOKEN_KEY || '';

    const token = req.body.token || req.query.token || req.headers['x-access-token']

    if (!token) {
        res.status(403).send({ auth: false, message: 'Token not provided.' })
        return;
    };

    try {
        const decoded = jwt.verify(token, configSecret);
        req.decoded = decoded;
        next();
    } catch (error) {
        res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    
}

export const authenticate = async (loginData: LoginModel) => {

    const userRepository = new UserRepository();

    const { email, password } = loginData;

    if (!(email && password)) return ({ statusCode: 400, message: 'Email and password is required' });

    const [userExist] = await userRepository.findUserByEmail(email);

    const passowrdIsCorrect = comparePassword(password, userExist.password);

    const authenticationSuccess = userExist && passowrdIsCorrect;

    if (!authenticationSuccess) return ({ statusCode: 400, message: 'Email or password invalid' });

    const token = genToken({ user_id: userExist.id, email: userExist.email }, '2h');

    return {
        auth: true,
        token
    };
}