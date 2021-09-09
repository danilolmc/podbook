import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonControlComponent } from "./button-control.component";
import { ButtonControlDirective } from './directives/button-control.directive';

@NgModule({
    declarations: [ButtonControlComponent, ButtonControlDirective],
    imports: [CommonModule],
    exports: [ButtonControlComponent, ButtonControlDirective]
})
export class ButtonControlModule { }