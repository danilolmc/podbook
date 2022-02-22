import { PaginationMatadata } from "../model/PaginationMetadata";

export class Page<T>{

    readonly data: T[];
    readonly paginationMetadata: PaginationMatadata;

    constructor(data: T[], paginationMetadata: PaginationMatadata) {
        this.data = data;
        this.paginationMetadata = paginationMetadata;
    }
}