import { PaginationData } from "./PaginationData";

export class PaginationMatadata {

    readonly page: number;
    readonly pagesAmount: number;
    readonly hasPreviousPage: boolean;
    readonly hasNexPage: boolean;
    readonly itemsAmount: number;
    readonly limit: number;

    constructor({ paginationOptions, itemsAmount }: PaginationData) {
        this.page = paginationOptions.currentPage;
        this.limit = paginationOptions.recordsPerPage;
        this.itemsAmount = itemsAmount
        this.pagesAmount = Math.ceil(this.itemsAmount / this.limit);
        this.hasPreviousPage = this.page > 1;
        this.hasNexPage = this.page < this.pagesAmount;
    }
}
