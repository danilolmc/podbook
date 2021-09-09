import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonControlModule } from "@components/button-control/button-control.module";
import { ButtonControlDirective } from "@components/button-control/directives/button-control.directive";
import { AudioControlComponent } from "./audio-control.component";

@NgModule({
    declarations: [AudioControlComponent],
    imports: [ButtonControlModule, CommonModule],
    exports: [AudioControlComponent]
})
export class AudioControlModule{
    
}