import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { TabItemComponent } from '@components/tab/tab-item/tab-item.component';
import { TabComponent } from '@components/tab/tab.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'pod-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss'],
})
export class StudioComponent implements OnDestroy, OnInit {

  @ViewChild(TabComponent) tab!:  TabComponent;
  @ViewChildren(TabItemComponent) tabitems = new QueryList<TabItemComponent>()

  notifier = new Subject();

  tabStudioCallback = () => {
    this.currentUrl = '/podbooks/studio'
    this.route.navigate(['/podbooks/studio'])
  };
  tabPodbooksCallback = () => {
    this.currentUrl = '/podbooks'
    this.route.navigate(['/podbooks']);
  };

  currentUrl = '';

  constructor(private route: Router) { }

  ngOnInit() {

    // this.tabPodbooksCallback();
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }

  isSelected(url: string) {
    return this.currentUrl === url;
  }

  openStudio() {
    this.tab.selectTab(this.tabitems.last);
  }
}
