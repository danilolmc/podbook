import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { UserModel } from "../model/UserModel";
import { hashPassword } from "../utils/Hashing";

export default class UserRepository {

    private repository = getRepository(User);

    async createUser(userData: UserModel) {

        const hashPassowrd = await hashPassword(userData.password);

        const user = { ...userData, password: hashPassowrd }

        return this.repository.save(user);
    }

    async findUserByEmail(email: string) {

        return await this.repository.findOne({ email });
    }

    async findUserById(id: number) {
        return await this.repository.findOne({ id });
    }
}