import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  currentPageUrl = new BehaviorSubject('');

  @Input()
  urlBased = false;

  ngAfterContentInit(): void {
    this.setInitialState();

  }


  selectTab(clickedTab: TabItemComponent) {

    clickedTab.callBackFunction();

    this.tabs.forEach(tab => tab.selectItem = false);

    clickedTab.selectItem = true;
  }

  setInitialState() {

    const thereItemActive = this.tabs.some(tab => tab.selectedItem);

    if(!thereItemActive){
      this.tabs.forEach((tabItem, index) => {
        if (index === 0) tabItem.selectItem = true;
      });
    }
  }

}
