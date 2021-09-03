import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'pod-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss'],
})
export class StudioComponent implements OnDestroy, OnInit {

  notifier = new Subject();

  tabStudioCallback = () => {
    this.route.navigate(['/studio'])
    this.currentUrl = '/studio'
  };
  tabPodbooksCallback = () => {
    this.route.navigate(['/studio/podbooks']);
    this.currentUrl = '/studio/podbooks'
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

  constructor(private route: Router) { }

  ngOnInit() {
    
      this.tabStudioCallback();
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }

  isSelected(url: string) {
    return this.currentUrl === url;
  }
}
