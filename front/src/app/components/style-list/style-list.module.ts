import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { StyleListComponent } from "./style-list.component";

@NgModule({
    declarations: [StyleListComponent],
    imports: [CommonModule],
    exports: [StyleListComponent]
})
export class StyleListModule { }