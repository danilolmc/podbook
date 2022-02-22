import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonControlModule } from "@components/button-control/button-control.module";
import { AudioControlComponent } from "./audio-control.component";

@NgModule({
    declarations: [AudioControlComponent],
    imports: [ButtonControlModule, CommonModule],
    exports: [AudioControlComponent]
})
export class AudioControlModule {

}