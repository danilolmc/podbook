import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CardModule } from "@components/card/card.module";
import { CardsContainerModule } from "@components/cards-container/cards-container.module";
import { FloatButtonModule } from "@components/float-button/float-button.module";
import { StyleListModule } from "@components/style-list/style-list.module";

import { HomeComponent } from "./home.component";

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        CardModule,
        FloatButtonModule,
        StyleListModule,
        CardsContainerModule
    ],
    exports: [HomeComponent]
})
export class HomeModule { }