import { Params, RouterEvent } from "@angular/router";
import { BehaviorSubject, of } from "rxjs";

export const RouterStub = {

    events: of(new RouterEvent(0, '')),
    navigate: (route: string | string[]) => {}
}

export class MockActivatedRoute {
    private innerTestParams: any;
    private subject = new BehaviorSubject({});

    params = this.subject.asObservable();
    queryParams = this.subject.asObservable();

    constructor(params?: Params) {

        this.testParams = params ? params : {};
    }

    get testParams() {
        return this.innerTestParams;
    }

    set testParams(params: {}) {
        this.innerTestParams = params;
        this.subject.next(params);
    }
}