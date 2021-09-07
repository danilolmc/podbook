import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "@pages/home/home.component";

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    {
        path: 'explore',
        loadChildren: () => import('@pages/explore/explore.module').then(explore => explore.ExploreModule)
    },
    {
        path: 'studio',
        loadChildren: () => import('@pages/studio/studio.module').then(studio => studio.StudioModule)
    },
    {
        path: 'account',
        loadChildren: () => import('@pages/account/account.module').then(account => account.AccountModule)
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }