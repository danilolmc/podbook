import { RouterEvent } from "@angular/router";
import { of } from "rxjs";

export const RouterStub = {

    events: of(new RouterEvent(0, '')),
    navigate(router: string) {

    }
}