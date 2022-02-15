import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonControlModule } from "@components/button-control/button-control.module";
import { CardModule } from "@components/card/card.module";
import { CardsContainerModule } from "@components/cards-container/cards-container.module";
import { FloatButtonModule } from "@components/float-button/float-button.module";
import { StyleListModule } from "@components/style-list/style-list.module";
import { TabModule } from "@components/tab/tab.module";
import { StudioRoutingModule } from "@routes/studio.routing.module";
import { StudioComponent } from "./studio.component";
import { RecordStudioComponent } from './record-studio/record-studio.component';
import { MyPodbooksComponent } from './my-podbooks/my-podbooks.component';
import { ButtonModule } from "@components/button/button.module";
import { FormFieldModule } from "@components/form-field/form-field.module";
import { SelectModule } from "@components/select/select.module";


@NgModule({
    declarations: [StudioComponent, RecordStudioComponent, MyPodbooksComponent],
    imports: [
        CommonModule,
        CardModule,
        FloatButtonModule,
        StyleListModule,
        CardsContainerModule,
        StudioRoutingModule,
        TabModule,
        ButtonControlModule,
        CardsContainerModule,
        ButtonModule,
        FormFieldModule,
        SelectModule

    ],
    exports: [StudioComponent]
})
export class StudioModule { }