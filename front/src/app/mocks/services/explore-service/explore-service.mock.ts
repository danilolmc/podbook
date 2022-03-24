import { PodbookPaginationRequestQueryParams } from "@typing/request/params";
import { Observable, of } from "rxjs";


export class ExploreServiceStub {

    getPodbooks({ limit, page = 1 }: PodbookPaginationRequestQueryParams): Observable<any> {

        return of([]);
    }
}