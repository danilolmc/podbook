import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CardModule } from "@components/card/card.module";
import { FloatButtonModule } from "@components/float-button/float-button.module";
import { StyleListModule } from "@components/style-list/style-list.module";
import { HomeComponent } from "./home.component";

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        CardModule,
        FloatButtonModule,
        StyleListModule
    ],
    exports: [HomeComponent]
})
export class HomeModule { }