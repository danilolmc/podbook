import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'pod-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss'],
})
export class StudioComponent implements OnInit {

  currentPageUrl = '/studio';

  subscription!: Subscription;

  constructor(private route: Router) {  }

  ngOnInit() {
    this.subscription = 
        this
        .route
        .events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe((event: any) => this.currentPageUrl = event.url);
  }


}
