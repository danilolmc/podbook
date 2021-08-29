import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TabItemComponent } from "./tab-item/tab-item.component";
import { TabComponent } from "./tab.component";

@NgModule({
    declarations: [TabComponent, TabItemComponent],
    imports: [CommonModule, RouterModule],
    exports: [TabComponent, TabItemComponent]
})
export class TabModule { }