import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormFieldModule } from "@components/form-field/form-field.module";
import { TabModule } from "@components/tab/tab.module";
import { SignInRoutingModule } from "@routes/signin.routing.module";
import { SignInComponent } from "./sign-in.component";

@NgModule({
    declarations: [SignInComponent],
    imports: [
        CommonModule,
        TabModule,
        FormFieldModule,
        RouterModule,
        SignInRoutingModule
    ],
    exports: [SignInComponent]
})
export class SignInModule { }