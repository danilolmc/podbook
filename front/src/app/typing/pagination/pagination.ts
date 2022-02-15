export interface PaginationMetadata {
    page: number,
    limit: number,
    itemsAmount: number,
    pagesAmount: number,
    hasPreviousPage: boolean,
    hasNexPage: boolean
}