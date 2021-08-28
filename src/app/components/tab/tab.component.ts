import { Component, ContentChildren, QueryList } from '@angular/core';
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

  titleMaxWidth = '7rem';

  ngAfterContentInit(): void {

    const theresTabSelected = this.tabs.find(tab => tab.selected);

    if (!theresTabSelected) this.selectTab(this.tabs.first);

  }

  selectTab(clickedTab: TabItemComponent){
      this.tabs.forEach(tab => tab.selected = false);

      clickedTab.selected = true;
  }
}
