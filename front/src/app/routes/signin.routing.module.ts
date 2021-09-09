import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SignInComponent } from "@pages/account/sign-in/sign-in.component";
import { SignUpComponent } from "@pages/account/sign-up/sign-up.component";

const routes: Routes = [
    {
        path: '',
        component: SignInComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SignInRoutingModule { }