import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CardModule } from "@components/card/card.module";
import { CardsContainerModule } from "@components/cards-container/cards-container.module";
import { FloatButtonModule } from "@components/float-button/float-button.module";
import { FormFieldModule } from "@components/form-field/form-field.module";
import { StyleListModule } from "@components/style-list/style-list.module";
import { ExploreRoutingModule } from "@routes/explore.routing.module";
import { ExploreComponent } from "./explore.component";

@NgModule({
    declarations: [ExploreComponent],
    imports: [
        CommonModule,
        CardModule,
        FloatButtonModule,
        StyleListModule,
        ExploreRoutingModule,
        FormFieldModule,
        CardsContainerModule
    ],
    exports: [ExploreComponent]
})
export class ExploreModule { }