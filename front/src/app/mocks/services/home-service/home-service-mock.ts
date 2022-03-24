import { of } from "rxjs";

export class HomeServiceStub {
    recentPodbooks(limit: number) {
        return of([]);
    }
}