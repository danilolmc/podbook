import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MenuModule } from "@components/menu/menu.module";
import { HomeComponent } from "./home.component";

@NgModule({
    declarations: [HomeComponent],
    imports: [CommonModule, MenuModule],
    exports: [HomeComponent]
})
export class HomeModule { }