import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MissingImageDirective } from "@directives/card/missing-image/missing-image.directive";
import { CardComponent } from "./card.component";

@NgModule({
    declarations: [CardComponent, MissingImageDirective],
    imports: [CommonModule],
    exports: [CardComponent]
})
export class CardModule { }