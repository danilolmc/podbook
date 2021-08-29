import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FloatButtonModule } from "@components/float-button/float-button.module";
import { StudioControlsComponent } from "./studio-controls.component";

@NgModule({
    declarations: [StudioControlsComponent],
    imports: [CommonModule, FloatButtonModule],
    exports: [StudioControlsComponent]
})
export class StudioControlsModule { }