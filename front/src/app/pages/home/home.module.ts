import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonModule } from "@components/button/button.module";
import { CardModule } from "@components/card/card.module";
import { CardsContainerModule } from "@components/cards-container/cards-container.module";
import { FloatButtonModule } from "@components/float-button/float-button.module";
import { SelectComponent } from "@components/select/select.component";
import { SelectModule } from "@components/select/select.module";
import { StepperModule } from "@components/stepper/stepper.module";
import { StyleListModule } from "@components/style-list/style-list.module";

import { HomeComponent } from "./home.component";

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        CardModule,
        FloatButtonModule,
        StyleListModule,
        CardsContainerModule,
        ButtonModule,
        StepperModule,
        SelectModule
    ],
    exports: [HomeComponent]
})
export class HomeModule { }