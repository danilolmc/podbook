import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FloatButtonComponent } from "./float-button.component";

@NgModule({
    declarations: [FloatButtonComponent],
    imports: [CommonModule, RouterModule],
    exports: [FloatButtonComponent]
})
export class FloatButtonModule { }