import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { LoginModel } from "../model/UserModel";
import UserRepository from "../repository/UserRespository";
import { comparePassword } from "../utils/Hashing";


export interface DecodedJwt {
    user_id: number;
    email: string;
    iat: number;
    exp: number;
}

export const decodeToken = (jwtToken: string) => {
    const configSecret: jwt.Secret = process.env.TOKEN_KEY || '';

    return jwt.verify(jwtToken, configSecret);
}

export const genToken = (tokenProperties: {}, expireTime: number | string) => {

    const configSecret: string = process.env.TOKEN_KEY || '';

    return jwt.sign({ ...tokenProperties }, configSecret, { expiresIn: expireTime })
}

export const verifyToken = (req: any, res: Response, next: any) => {

    const token =
        req.body.token ||
        req.headers['x-auth-token'];

    if (!token) {
        res.status(403).send({ auth: false, message: 'Token not provided.' })
        return;
    };

    try {
        const decoded = decodeToken(token);
        req.headers.decoded_jwt = decoded;
        next();
    } catch (error) {
        res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    }

}

export const authenticate = async (loginData: LoginModel) => {

    const userRepository = new UserRepository();

    const { email, password } = loginData;

    if (!(email && password)) return ({ statusCode: 401, message: 'Email and password is required' });

    const userExist = await userRepository.findUserByEmail(email);

    let passowrdIsCorrect = false;

    if (userExist) {
        passowrdIsCorrect = comparePassword(password, userExist.password)
    } else {

        return ({ statusCode: 404, message: 'User not found' })
    }

    const authenticationSuccess = userExist && passowrdIsCorrect;

    if (!authenticationSuccess) return ({ statusCode: 401, message: 'Email or password invalid' });

    const token = genToken({ user_id: userExist.id, email: userExist.email }, '2h');

    return {
        auth: true,
        token
    };
}