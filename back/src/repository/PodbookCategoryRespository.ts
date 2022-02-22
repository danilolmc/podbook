import { getRepository } from "typeorm";
import { PodbookCategory } from "../entity/PodbookCategory";

export default class PodbookCategoryRepository {

    private repository = getRepository(PodbookCategory);

    getPodbookCategories(limit = 15) {

        return this.repository.find({ take: limit });
    }
}