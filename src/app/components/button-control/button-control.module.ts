import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonControlComponent } from "./button-control.component";

@NgModule({
    declarations: [ButtonControlComponent],
    imports: [CommonModule],
    exports: [ButtonControlComponent]
})
export class ButtonControlModule { }