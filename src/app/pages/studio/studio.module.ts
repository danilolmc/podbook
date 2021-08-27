import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CardModule } from "@components/card/card.module";
import { CardsContainerModule } from "@components/cards-container/cards-container.module";
import { FloatButtonModule } from "@components/float-button/float-button.module";
import { StyleListModule } from "@components/style-list/style-list.module";
import { StudioRoutingModule } from "@routes/studio.routing.module";
import { StudioComponent } from "./studio.component";


@NgModule({
    declarations: [StudioComponent],
    imports: [
        CommonModule,
        CardModule,
        FloatButtonModule,
        StyleListModule,
        CardsContainerModule,
        StudioRoutingModule
    ],
    exports: [StudioComponent]
})
export class StudioModule { }