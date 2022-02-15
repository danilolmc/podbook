import { getRepository } from "typeorm";
import { Podbook } from "../entity/Podbook";
import { PageOptions } from "../model/Pagination";
import { PaginationMatadata } from "../model/PaginationMetadata";
import { PodbookModel } from "../model/PodbookModel";
import { Page } from "../utils/Page";

export default class PodbookRepository {

    private repository = getRepository(Podbook);

    createPodbook(podbookData: PodbookModel) {
        return this.repository.save(podbookData);
    }

    findUserById(id: number) {
        return this.repository.findOne({ id });
    }

    getRecents(limit = 8, relations = ['category']) {
        return this.repository.find({ take: limit, relations, order: {id: 'DESC'} });
    }

    async explorePodbooks(pageOptions: PageOptions) {

        const podbookQueryBuilder = this.repository.createQueryBuilder('podbook');

        podbookQueryBuilder
            .leftJoinAndSelect('podbook.category', 'category')
            .skip(pageOptions.nextPage)
            .take(pageOptions.recordsPerPage)


        const itemsAmount = await podbookQueryBuilder.getCount();
        const { entities: podbooks } = await podbookQueryBuilder.getRawAndEntities();

        const pageMetadata = new PaginationMatadata({
            itemsAmount: itemsAmount,
            paginationOptions: pageOptions
        });

        return new Page<Podbook>(podbooks, pageMetadata);
    }

}