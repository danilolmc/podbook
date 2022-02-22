
export class PageOptions {

    constructor(private page = 1, private amountPerPage: number) {
    }

    get currentPage() {
        return this.page;
    }

    get recordsPerPage() {
        return this.amountPerPage;
    }

    get nextPage() {
        return (this.page - 1) * this.amountPerPage;
    }

}

export interface PageOptionsParams{
    limit: number;
    page: number;
}

export interface PageOptionsParamsWithUserId extends PageOptionsParams{
    user_id: number;
}