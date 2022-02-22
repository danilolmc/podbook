import { getRepository } from "typeorm";
import { Podbook } from "../entity/Podbook";
import { PageOptions } from "../model/Pagination";
import { PaginationMatadata } from "../model/PaginationMetadata";
import { Page } from "../utils/Page";

export default class UserPodbookRepository {

    private repository = getRepository(Podbook);

    async getUserPodbooks(user_id: number, pageOptions: PageOptions) {

        const podbookQueryBuilder = this.repository.createQueryBuilder('podbook');

        podbookQueryBuilder
            .leftJoinAndSelect('podbook.category', 'category')
            .leftJoin('podbook.user_owner', 'user')
            .where('user.id = :id', { id: user_id })
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