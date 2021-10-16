import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MyPodbooksComponent } from "@pages/studio/my-podbooks/my-podbooks.component";
import { RecordStudioComponent } from "@pages/studio/record-studio/record-studio.component";
import { StudioComponent } from "@pages/studio/studio.component";
const routes: Routes = [
    {
        path: '',
        component: StudioComponent,

        children: [
            {
                path: '',
                component: MyPodbooksComponent
            },
            {
                path: 'studio',
                component: RecordStudioComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StudioRoutingModule { }