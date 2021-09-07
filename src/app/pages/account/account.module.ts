import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { TabModule } from "@components/tab/tab.module";
import { AccountRoutingModule } from "@routes/account.routing.module";
import { AccountComponent } from "./account.component";
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
    declarations: [AccountComponent, SignInComponent, SignUpComponent],
    imports: [
        CommonModule,
        AccountRoutingModule,
        TabModule,
    ],
    exports: [AccountComponent]
})
export class AccountModule { }