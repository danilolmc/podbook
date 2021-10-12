import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormFieldModule } from "@components/form-field/form-field.module";
import { TabModule } from "@components/tab/tab.module";
import { SignUpRoutingModule } from "@routes/signup.routing.module";
import { SignUpComponent } from "./sign-up.component";

@NgModule({
    declarations: [SignUpComponent],
    imports: [
        CommonModule,
        TabModule,
        FormFieldModule,
        RouterModule,
        SignUpRoutingModule
    ],
    exports: [SignUpComponent],
})
export class SignUpModule { }