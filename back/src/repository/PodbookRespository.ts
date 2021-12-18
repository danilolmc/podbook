import { getRepository } from "typeorm";
import { Podbook } from "../entity/Podbook";
import { PodbookModel } from "../model/PodbookModel";

export default class PodbookRepository {

    private repository = getRepository(Podbook);

    createPodbook(userData: PodbookModel) {

        const user = { ...userData }

        return this.repository.save(user);
    }

    getPodbooks(email: string) {

        return this.repository;
    }

    findUserById(id: number) {
        return this.repository.findOne({ id });
    }

    getRecents(limit: number = 8) {
        return this.repository.find({ take: limit });
    }
}