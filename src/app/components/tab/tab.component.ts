import { Component, ContentChildren, Input, QueryList } from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';
import { Tab } from './types/Tab';




@Component({
  selector: 'pod-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements Tab {

  @ContentChildren(TabItemComponent)
  tabs!: QueryList<TabItemComponent>;

  ngAfterContentInit(): void {
    this.setInitialState();

  }

  setInitialState(){

    const theresTabSelected = this.tabs.some(tab => tab.selected);

    if (!theresTabSelected) this.tabs.forEach((tabItem, index) => {
      if (index === 0) tabItem.selected = true;
    });
  }

  selectTab(clickedTab: TabItemComponent) {
    this.tabs.forEach(tab => tab.selected = false);

    clickedTab.selected = true;
  }
}
