import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TabItem } from '@components/tab/types/TabItem';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TabRoutedCreator } from './types/studioPage';

@Component({
  selector: 'pod-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss'],
})
export class StudioComponent implements OnDestroy, OnInit {

  notifier = new Subject();

  tabStudioCallback = () => {
    this.route.navigate(['/studio'])
    localStorage.setItem('tag', '/studio')
  };
  tabPodbooksCallback = () => {
    this.route.navigate(['/studio/podbooks']);
    localStorage.setItem('tag', '/studio/podbooks');
  };

  currentUrl = '';

  tabItems = [
    {
      title: 'studio',
      callback: this.tabStudioCallback,
      route: '/studio',
      selected: true,
    },
    {
      title: 'my podbooks',
      callback: this.tabPodbooksCallback,
      route: '/studio/podbooks',
      selected: false,
    }
  ];

  constructor(private route: Router, private router: ActivatedRoute) { }

  ngOnInit() {

    localStorage.setItem('tab','/studio');
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }

  isSelected(url: string) {

    return localStorage.getItem('tag') === url;
  }


}
