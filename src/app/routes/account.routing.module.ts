import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "@pages/account/account.component";
import { SignInComponent } from "@pages/account/sign-in/sign-in.component";
import { SignUpComponent } from "@pages/account/sign-up/sign-up.component";

const routes: Routes = [
    {
        path: '',
        component: AccountComponent,

        children: [
            {
                path: '',
                component: SignInComponent
            },
            {
                path: 'sign-up',
                component: SignUpComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }