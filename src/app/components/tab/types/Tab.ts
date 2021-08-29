import { QueryList } from "@angular/core";
import { TabItemComponent } from "../tab-item/tab-item.component";

export abstract class Tab{
    
    tabs!: QueryList<TabItemComponent>;
    
    abstract selectTab(tab: TabItemComponent) : void;

    abstract setInitialState() : void;
}