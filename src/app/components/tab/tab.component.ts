import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { TabItemComponent } from './tab-item/tab-item.component';
import { Tab } from './types/Tab';

@Component({
  selector: 'pod-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements Tab {

  @ContentChildren(TabItemComponent)
  tabs!: QueryList<TabItemComponent>;


  @Input()
  currentPageUrl = '';

  @Input()
  urlBased = false;

  ngAfterContentInit(): void {
    this.setInitialState();

  }

  constructor(private router: Router) { }


  selectTab(clickedTab: TabItemComponent) {
    
    if (!!this.currentPageUrl) {
      this.router.navigateByUrl(clickedTab.urlAnchor)
    };
    
    this.tabs.forEach(tab => tab.selected = false);
    
    clickedTab.selected = true;    
  }

  setInitialState() {
    
    if (!!this.currentPageUrl) {
      this.tabs.forEach((tabItem, index) => {
        if (this.currentPageUrl === tabItem.urlAnchor) {
          tabItem.selected = true
          this.router.navigateByUrl(tabItem.urlAnchor)
        };
      });
      

      return;
    }

    this.tabs.forEach((tabItem, index) => {
      if (index === 0) tabItem.selected = true;
    });


  }
}
