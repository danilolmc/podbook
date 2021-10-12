import bcrypt from 'bcrypt';

export const hashPassword = (pwd: string) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(pwd, salt);
    return hash;
}

export const comparePassword = (origin: string, target: string) => {

    return bcrypt.compareSync(origin, target);
}