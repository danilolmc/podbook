import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CardModule } from "@components/card/card.module";
import { FormFieldModule } from "@components/form-field/form-field.module";
import { StyleListModule } from "@components/style-list/style-list.module";
import { CardsContainerComponent } from "./cards-container.component";

@NgModule({
    declarations: [CardsContainerComponent],
    imports: [
        CommonModule,
        CardModule,
        StyleListModule,
        FormFieldModule,
    ],
    exports: [CardsContainerComponent]
})
export class CardsContainerModule { }