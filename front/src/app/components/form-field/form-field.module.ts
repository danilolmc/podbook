import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormFieldComponent } from "./form-field.component";

@NgModule({
    declarations: [FormFieldComponent],
    imports: [CommonModule, ReactiveFormsModule],
    exports: [FormFieldComponent]
})
export class FormFieldModule { }