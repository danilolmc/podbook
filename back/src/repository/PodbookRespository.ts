import { getRepository } from "typeorm";
import { Podbook } from "../entity/Podbook";
import { PodbookModel } from "../model/PodbookModel";

export default class UserRepository {

    private repository = getRepository(Podbook);

    async createPodbook(userData: PodbookModel) {

        const user = { ...userData }

        return this.repository.save(user);
    }

    async getPodbooks(email: string) {

        return await this.repository;
    }

    async findUserById(id: number) {
        return await this.repository.findOne({ id });
    }
}