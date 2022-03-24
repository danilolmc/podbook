import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';
import { Tab } from './types/Tab';

@Component({
  selector: 'pod-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements Tab, AfterContentInit {

  @ContentChildren(TabItemComponent)
  tabs!: QueryList<TabItemComponent>;

  @Input()
  urlBased = false;

  ngAfterContentInit(): void {
    this.setInitialState();
  }

  selectTab(clickedTab: TabItemComponent) {

    clickedTab.callback();

    this.tabs.forEach(tab => tab.selectItem = false);

    clickedTab.selectItem = true;
  }

  setInitialState() {

    const thereItemActive = this.tabs.some(tab => tab.selected);

    if (!thereItemActive) {
      this.tabs.forEach((tabItem, index) => {
        if (index === 0) tabItem.selectItem = true;
      });
    }
  }
}
