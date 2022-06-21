import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ButtonControlModule } from "@components/button-control/button-control.module";
import { AudioPipe } from "@pipes/audioTimeFormat";
import { AudioControlComponent } from "./audio-control.component";

@NgModule({
    declarations: [AudioControlComponent, AudioPipe],
    imports: [ButtonControlModule, CommonModule],
    exports: [AudioControlComponent]
})
export class AudioControlModule {

}